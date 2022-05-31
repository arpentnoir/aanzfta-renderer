// Create an S3 Bucket Policy to allow public read of all objects in bucket
// This reusable function can be pulled out into its own module
export function publicReadPolicyForBucket(bucketName: string) {
  return JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetObject"],
        Resource: [
          `arn:aws:s3:::${bucketName}/*`, // policy refers to bucket name explicitly
        ],
      },
    ],
  });
}

// Create an Origin Access Identiy to allow public read of all objects in bucket
// This reusable function can be pulled out into its own module
export const originAccessIdentityPolicyForBucket = (
  bucketArn: string,
  oaiArn: string
) => {
  return JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: oaiArn,
        },
        Action: ["s3:GetObject"],
        Resource: [`${bucketArn}/*`],
      },
    ],
  });
};
