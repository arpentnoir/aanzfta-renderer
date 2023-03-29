import * as pulumi from "@pulumi/pulumi";
import { auditLogBucket } from "../common/auditLogBucket";
import { originAccessIdentity } from "../common/originAccessIdentity";
import { createS3HostedWebsite } from "./s3Website";

const config = {
  hostedZoneDomain: process.env.TARGET_DOMAIN,
  contextDomain: process.env.DVP_CONTEXT_DOMAIN,
};

if (!(config.hostedZoneDomain && config.contextDomain)) {
  throw new pulumi.RunError(
    `Missing one or more of the required environment variables: TARGET_DOMAIN, DVP_CONTEXT_DOMAIN`
  );
}

export const {
  websiteBucketName: dvpContextBucketName,
  websiteCloudfrontAliases: dvpContextCloudfrontAliases,
} = createS3HostedWebsite({
  bucketName: "dvpContext",
  domain: config.contextDomain,
  hostedZoneDomain: config.hostedZoneDomain,
  pathToBucketContents: "../artifacts/contexts",
  auditLogBucket: auditLogBucket,
  originAccessIdentity: originAccessIdentity,
});
