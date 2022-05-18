SHELL := /bin/bash

# Default env variables
APP_NAME = ha-dvp-schema-registry
ENV ?= dev

AWS_REGION ?= ap-southeast-2
AWS_ACCOUNT_ID ?= 580315648792
AWS_ROLENAME ?= codeontap-automation
PULUMI_STATE_URL ?= s3://${AWS_ACCOUNT_ID}-pulumi-state
PULUMI_CONFIG_PASSPHRASE ?= 

.EXPORT_ALL_VARIABLES: ; # send all vars to shell

install:
	cd apps && npm install

lint:
	cd apps && npm run lint

unit-test:
	cd apps && npm run test

build:
	cd apps && npm run build

### Deployment

pulumi-preview:
	. scripts/run-pulumi.sh preview

pulumi-up:
	. scripts/run-pulumi.sh up

pulumi-destroy:
	. scripts/run-pulumi.sh destroy