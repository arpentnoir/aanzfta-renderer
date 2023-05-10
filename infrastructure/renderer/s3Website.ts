import * as aws from '@pulumi/aws';
import { Components } from "gs-pulumi-library";
import { OriginAccessIdentity } from "@pulumi/aws/cloudfront";

export interface S3HostedWebsiteConfig {
  bucketName: string;
  domain: string;
  hostedZoneDomain: string;
  pathToBucketContents: string;
  auditLogBucket: Components.aws.S3Bucket;
  originAccessIdentity: OriginAccessIdentity;
}

export const createS3HostedWebsite = (config: S3HostedWebsiteConfig) => {
  // Setup SSL certificate, required for cloudfront dist
  const provider = new aws.Provider(`${config.domain}-provider-us-east-1`, {
    region: 'us-east-1',
  });

  // Get hosted zone
  const hostedZoneId = aws.route53
    .getZone({ name: config.hostedZoneDomain }, {})
    .then((zone) => zone.zoneId);

  // Create new certificate
  const sslNewCertificate = new aws.acm.Certificate(config.domain, {
    domainName: config.domain,
    validationMethod: "DNS",
  });

  // Create S3 Bucket and Cloudfront Distribution for `dvpWebsite`
  const websiteS3Bucket = new Components.aws.S3Bucket(
    `${config.bucketName}S3Bucket`,
    {
      description: `S3 Bucket for '${config.bucketName}' static website contents.`,
      bucketName: config.domain,
      /**
       * NOTE on argument `kmsMasterKeyId` -
       * Cloudfront cannot by default access S3 objects encrypted with SSE-KMS. To do so requires setting up Cloudfront Lambda@Edge.
       * See: https://aws.amazon.com/blogs/networking-and-content-delivery/serving-sse-kms-encrypted-content-from-s3-using-cloudfront/
       * Therefore - for the moment we omit the `kmsMasterKeyId` and thus default to using standard SSE-S3 encryption on this bucket.
       * TODO - clarify requirements with client.
       */
      // kmsMasterKeyId: kmsCmkAlias.targetKeyId,
      logBucket: config.auditLogBucket.bucket,
      logBucketPrefix: `s3/${config.domain}/`,
      pathToBucketContents: config.pathToBucketContents,
      website: { indexDocument: "index.html", errorDocument: "index.html" },
      forceDestroy: true,
    }
  );

  const wafipSet = new aws.waf.IpSet(`${config.domain}-ipset`, {ipSetDescriptors: [
    {type: "IPV4", value: "164.97.246.192/28"},
    {type: "IPV4", value: "20.36.64.0/19"},
    {type: "IPV4", value: "20.36.112.0/20"},
    {type: "IPV4", value: "20.39.72.0/21"},
    {type: "IPV4", value: "20.39.96.0/19"},
    {type: "IPV4", value: "40.82.12.0/22"},
    {type: "IPV4", value: "40.82.244.0/22"},
    {type: "IPV4", value: "40.90.130.32/28"},
    {type: "IPV4", value: "40.90.142.64/27"},
    {type: "IPV4", value: "40.90.149.32/27"},
    {type: "IPV4", value: "40.126.128.0/18"},
    {type: "IPV4", value: "52.143.218.0/24"},
    {type: "IPV4", value: "52.239.218.0/23"},
    {type: "IPV4", value: "20.36.32.0/19"},
    {type: "IPV4", value: "20.36.104.0/21"},
    {type: "IPV4", value: "20.37.0.0/16"},
    {type: "IPV4", value: "20.38.184.0/22"},
    {type: "IPV4", value: "20.39.64.0/21"},
    {type: "IPV4", value: "40.82.8.0/22"},
    {type: "IPV4", value: "40.82.240.0/22"},
    {type: "IPV4", value: "40.90.130.48/28"},
    {type: "IPV4", value: "40.90.142.96/27"},
    {type: "IPV4", value: "40.90.149.64/27"},
    {type: "IPV4", value: "52.143.219.0/24"},
    {type: "IPV4", value: "52.239.216.0/23"},
    {type: "IPV4", value: "101.167.226.80/28"},
    {type: "IPV4", value: "101.167.229.80/28"},
    {type: "IPV4", value: "164.97.245.84/32"},
    {type: "IPV4", value: "162.145.253.0/24"},
    {type: "IPV4", value: "20.37.10.126/32"},
    {type: "IPV4", value: "52.63.239.67/32"},
    {type: "IPV4", value: "13.237.226.46/32"},
    {type: "IPV4", value: "13.237.79.235/32"},
    {type: "IPV4", value: "54.253.251.57/32"},
    {type: "IPV4", value: "54.206.104.206/32"},
    {type: "IPV4", value: "3.24.86.208/32"}
  ]}, { provider: provider });

  const wafRule = new aws.waf.Rule(`${config.domain}-rule`, {
    metricName: "RuleMetric",
    predicates: [{
      dataId: wafipSet.id,
      negated: false,
      type: "IPMatch",
    }],
    }, {
      dependsOn: [wafipSet],
  });

  const wafAcl = new aws.waf.WebAcl(`${config.domain}-wafAcl`, {
    metricName: "webACLMetric",
    defaultAction: {
      type: "BLOCK",
    },
    rules: [{
      action: {
        type: "ALLOW",
      },
      priority: 1,
      ruleId: wafRule.id,
      type: "REGULAR",
    }], 
    }, {
    dependsOn: [
      wafipSet,
      wafRule,
    ],
  });

  const website = new Components.aws.CloudfrontWebsite(config.domain, {
    description: `Static website for ${config.domain} SPA. Stored on S3. Served via Cloudfront`,

    s3Bucket: websiteS3Bucket.bucket,

    hostedZoneDomain: config.hostedZoneDomain,
    targetDomain: config.domain,
    logBucket: config.auditLogBucket.bucket,
    logBucketPrefix: `cloudfront/${config.domain}/`,
    originAccessIdentity: config.originAccessIdentity,

    webAclId: wafAcl.id
  });

  return {
    websiteBucketName: websiteS3Bucket.bucketName(),
    websiteCloudfrontAliases: website.cloudfrontAliases(),
  };
};
