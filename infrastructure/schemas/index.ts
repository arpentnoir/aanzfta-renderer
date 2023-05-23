import * as aws from '@pulumi/aws';
import * as command from '@pulumi/command';
import * as pulumi from '@pulumi/pulumi';

export const schemasBucket = new aws.s3.Bucket(
  `dvp-${process.env.ENV}-credential-schemas`,
  {
    bucket: `dvp-${process.env.ENV}-credential-schemas`,
    acl: aws.s3.PrivateAcl,
    forceDestroy: true,
  }
);

export const schemasBucketNotificationQueue = new aws.sqs.Queue(
  `dvp-${process.env.ENV}-credential-schemas-event-queue`,
  {
    name: `dvp-${process.env.ENV}-credential-schemas-event-queue`,
    policy: pulumi.interpolate`{
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": "*",
          "Action": "sqs:SendMessage",
          "Resource": "arn:aws:sqs:*:*:*",
          "Condition": {
            "ArnEquals": { "aws:SourceArn": "${schemasBucket.arn}" }
          }
        }
      ]
    }`,
  },
  {
    dependsOn: [schemasBucket],
  }
);

export const schemasBucketNotification = new aws.s3.BucketNotification(
  `dvp-${process.env.ENV}-credential-schemas-notification`,
  {
    bucket: schemasBucket.id,
    queues: [
      {
        queueArn: pulumi.interpolate`${schemasBucketNotificationQueue.arn}`,
        events: ['s3:ObjectCreated:*', 's3:ObjectRemoved:*'],
        filterSuffix: '.json',
      },
    ],
  },
  {
    dependsOn: [schemasBucketNotificationQueue],
  }
);

const schemasPath = '../artifacts/schemas';
const schemasBucketName = pulumi.interpolate`${schemasBucket.bucket}`;
const syncedTimeStamp = new Date().toISOString();
const syncCommand = pulumi.interpolate`
aws s3 sync "${schemasPath}" "s3://${schemasBucketName}" --acl "${aws.s3.PrivateAcl}" --region "${process.env.AWS_REGION}" --delete --only-show-errors;
aws s3api list-objects --bucket "${schemasBucketName}" --region "${process.env.AWS_REGION}" --query 'Contents[].{Key:Key}' --output text | xargs -n 1 -I targetobject aws s3api put-object-tagging --bucket "${schemasBucketName}" --region "${process.env.AWS_REGION}" --tagging 'TagSet=[{Key="LAST_SYNCED_TIMESTAMP",Value="${syncedTimeStamp}"}]' --key targetobject;
`;
const deleteCommand = pulumi.interpolate`aws s3 rm "s3://${schemasBucketName}" --include "*" --recursive --only-show-errors`;

new command.local.Command(
  `dvp-${process.env.ENV}-sync-schemas-command`,
  {
    create: syncCommand,
    update: syncCommand,
    delete: deleteCommand,
    environment: {
      LAST_SYNCED_TIMESTAMP: syncedTimeStamp,
    },
  },
  {
    dependsOn: [schemasBucketNotification],
  }
);
