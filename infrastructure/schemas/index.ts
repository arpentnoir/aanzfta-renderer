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

new synced.S3BucketFolder(`dvp-${process.env.ENV}-sync-schemas`, {
  path: '../artifacts/schemas',
  bucketName: schemasBucket.bucket,
  acl: aws.s3.PrivateAcl,
});

export const schemasBucketNotificationTopic = new aws.sqs.Queue(
  `dvp-${process.env.ENV}-credential-schemas-event-queue`,
  {
    policy: pulumi.interpolate`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
	  "Resource": "arn:aws:sqs:*:*:s3-event-notification-queue",
      "Condition": {
        "ArnEquals": { "aws:SourceArn": "${schemasBucket.arn}" }
      }
    }
  ]
}
`,
  }
);

export const schemasBucketNotification = new aws.s3.BucketNotification(
  `dvp-${process.env.ENV}-credential-schemas-notification`,
  {
    bucket: schemasBucket.id,
    topics: [
      {
        topicArn: schemasBucketNotificationTopic.arn,
        events: ['s3:ObjectCreated:*', 's3:ObjectRemoved:*'],
        filterSuffix: '.json',
      },
    ],
  }
);
