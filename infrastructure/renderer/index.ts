import * as pulumi from "@pulumi/pulumi";
import { auditLogBucket } from "../common/auditLogBucket";
import { originAccessIdentity } from "../common/originAccessIdentity";
import { createS3HostedWebsite } from "./s3Website";

const config = {
  hostedZoneDomain: process.env.TARGET_DOMAIN,
  rendererDomain: process.env.DVP_RENDERER_DOMAIN,
};

if (!(config.hostedZoneDomain && config.rendererDomain)) {
  throw new pulumi.RunError(
    `Missing one or more of the required environment variables: TARGET_DOMAIN, DVP_RENDERER_DOMAIN`
  );
}

export const {
  websiteBucketName: dvpWebsiteBucketName,
  websiteCloudfrontAliases: dvpWebsiteCloudfrontAliases,
} = createS3HostedWebsite({
  bucketName: "dvpRenderer",
  domain: config.rendererDomain,
  hostedZoneDomain: config.hostedZoneDomain,
  pathToBucketContents: "../../artifacts/distributed-renderer-build",
  auditLogBucket: auditLogBucket,
  originAccessIdentity: originAccessIdentity,
});
