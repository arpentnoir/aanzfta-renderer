import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';
import * as synced from '@pulumi/synced-folder';

const dvpStack = pulumi.getStack();

export const schemasBucket = new aws.s3.Bucket(
  `dvp-${process.env.ENV}-credential-schemas`,
  {
    acl: aws.s3.PrivateAcl,
  }
);

export const syncedS3BucketFolder = new synced.S3BucketFolder(
  `dvp-${process.env.ENV}-sync-schemas`,
  {
    path: '../artifacts/schemas',
    bucketName: pulumi.interpolate`${schemasBucket.bucket}`,
    acl: aws.s3.PrivateAcl,
  },
  {
    dependsOn: [schemasBucket],
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
    dependsOn: [syncedS3BucketFolder],
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
