import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const targetDomain = config.require("targetDomain");

// Get hosted zone
export const hostedZoneId = aws.route53
  .getZone({ name: targetDomain }, { async: true })
  .then((zone) => zone.zoneId);
