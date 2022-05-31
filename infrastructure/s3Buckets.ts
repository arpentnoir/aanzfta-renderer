import * as aws from "@pulumi/aws";
import * as mime from "mime";
import * as path from "path";
import * as pulumi from "@pulumi/pulumi";

import { hostedZoneId } from "./hostedZone";
import { originAccessIdentityPolicyForBucket } from "./s3Policies";
import { getAllFiles } from "./utils";

const ENV = process.env.ENV;

if (!ENV) {
  throw new pulumi.RunError(
    `Missing one or more of the required environment variables: ENV`
  );
}

const stack = pulumi.getStack();
const config = new pulumi.Config();

const targetDomain = config.require("targetDomain");
const distributedRendererDomain = `${ENV}.renderer.${targetDomain}`;

////////////////////////////////////////////////////////////////////////////////
// S3 bucket for app "distributed-renderer-website"
const distributedRendererSpaBucket = new aws.s3.Bucket(
  "DistributedRendererSpaBucket",
  {
    bucket: `${stack}-distributed-renderer`,
    website: { indexDocument: "index.html", errorDocument: "index.html" },
  }
);

const distributedRendererSpaBucketDir =
  "../artifacts/distributed-renderer-build"; // directory for content files

// For each file in the directory, create an S3 object stored in `distributedRendererSpaBucket`
for (const filePath of getAllFiles(distributedRendererSpaBucketDir, [])) {
  const s3key = path.relative(distributedRendererSpaBucketDir, filePath);

  new aws.s3.BucketObject(`${stack}-${s3key}`, {
    bucket: distributedRendererSpaBucket,
    key: s3key,
    source: new pulumi.asset.FileAsset(filePath), // use FileAsset to point to a file
    contentType: mime.getType(filePath) || undefined, // set the MIME type of the file
  });
}

// Create CloudFront Origin Access Identity
const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity(
  `${stack}-cf-originAccessIdentity`
);

// Set the access policy for the bucket so all objects are readable
const distributedRendererWebsiteBucketPolicy = new aws.s3.BucketPolicy(
  "distributedRendererWebsiteBucketPolicy",
  {
    bucket: distributedRendererSpaBucket.bucket,
    policy: pulumi
      .all([distributedRendererSpaBucket.arn, originAccessIdentity.iamArn])
      .apply(([bucketArn, oaiArn]) =>
        originAccessIdentityPolicyForBucket(bucketArn, oaiArn)
      ),
  }
);

exports.distributedRendererSpaBucketName = distributedRendererSpaBucket.bucket; // create a stack export for bucket name
exports.distributedRendererSpaWebsiteUrl =
  distributedRendererSpaBucket.websiteEndpoint; // output the endpoint as a stack output

////////////////////////////////////////////////////////////////////////////////
// Certificates must be in us-east-1
const certsEastRegion = new aws.Provider(`${stack}-ssl-east`, {
  profile: aws.config.profile,
  region: "us-east-1",
});

// CloudFront for app "distributed-renderer-website"
const distributedRendererWebsiteCertificate = pulumi.output(
  aws.acm.getCertificate(
    {
      domain: distributedRendererDomain,
      statuses: ["ISSUED"],
    },
    { provider: certsEastRegion }
  )
);

const distributedRendererWebsiteCloudFrontArgs: aws.cloudfront.DistributionArgs = {
  enabled: true,
  aliases: [distributedRendererDomain],
  origins: [
    {
      originId: distributedRendererSpaBucket.arn,
      domainName: distributedRendererSpaBucket.bucketRegionalDomainName,
      s3OriginConfig: {
        originAccessIdentity: originAccessIdentity.cloudfrontAccessIdentityPath,
      },
    },
  ],
  customErrorResponses: [
    { errorCode: 403, responseCode: 200, responsePagePath: "/index.html" },
  ],
  defaultRootObject: "/index.html",
  defaultCacheBehavior: {
    targetOriginId: distributedRendererSpaBucket.arn,
    viewerProtocolPolicy: "redirect-to-https",
    allowedMethods: ["GET", "HEAD", "OPTIONS"],
    cachedMethods: ["GET", "HEAD", "OPTIONS"],
    forwardedValues: {
      cookies: { forward: "none" },
      queryString: false,
    },
    minTtl: 0,
    defaultTtl: 60 * 10,
    maxTtl: 60 * 10,
  },
  priceClass: "PriceClass_All",
  restrictions: {
    geoRestriction: {
      restrictionType: "none",
    },
  },
  viewerCertificate: {
    acmCertificateArn: distributedRendererWebsiteCertificate.arn,
    sslSupportMethod: "sni-only",
  },
};

const distributedRendererWebsiteCloudFront = new aws.cloudfront.Distribution(
  `${stack}-cf-distributedRendererWebsite`,
  distributedRendererWebsiteCloudFrontArgs
);

// Create Route53 Aliases
const distributedRendererWebsiteAliasRecord = new aws.route53.Record(
  distributedRendererDomain,
  {
    name: distributedRendererDomain,
    zoneId: hostedZoneId,
    type: "A",
    aliases: [
      {
        name: distributedRendererWebsiteCloudFront.domainName,
        zoneId: distributedRendererWebsiteCloudFront.hostedZoneId,
        evaluateTargetHealth: true,
      },
    ],
  }
);
