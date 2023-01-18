import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';
import * as synced from '@pulumi/synced-folder';

const dvpStack = pulumi.getStack();

export const contextsBucket = new aws.s3.Bucket(
  `dvp-${process.env.ENV}-credential-contexts`,
  {
    acl: aws.s3.PublicReadAcl,
  }
);

new synced.S3BucketFolder(`dvp-${process.env.ENV}-sync-contexts`, {
  path: '../artifacts/contexts',
  bucketName: contextsBucket.bucket,
  acl: aws.s3.PublicReadAcl,
});
