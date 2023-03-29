SHELL := /bin/bash

# Default env variables

APP_NAME = ha-dvp-schema-registry
ENV ?= e1

AWS_REGION ?= ap-southeast-2
AWS_ACCOUNT_ID ?= 636729270584
PULUMI_STATE ?= ${AWS_ACCOUNT_ID}-${APP_NAME}-${ENV}-pulumi-state
PULUMI_STATE_URL ?= s3://${AWS_ACCOUNT_ID}-${APP_NAME}-${ENV}-pulumi-state
PULUMI_CONFIG_PASSPHRASE ?= 
TARGET_DOMAIN ?= nonprod-dvp.cp4.homeaffairs.gov.au
DVP_RENDERER_DOMAIN ?= renderer.${ENV}.${TARGET_DOMAIN}
DVP_CONTEXT_DOMAIN ?= context.${ENV}.${TARGET_DOMAIN}

.EXPORT_ALL_VARIABLES: ; # send all vars to shell

install:
	cd renderer && yarn install

lint:
	cd renderer && yarn lint

unit-test:
	cd renderer && yarn test

build:
	cd renderer && yarn build

# helper command to create a `artifacts` dir locally (mirroring what happens in CI pipeline)
create-artifacts-locally:
	mkdir -p ./artifacts
	cp -r ./renderer/dist/. ./artifacts/distributed-renderer-build/
	cp -r ./contexts/. ./artifacts/contexts/
	cp -r ./schemas/. ./artifacts/schemas/


### Deployment
pulumi-preview:
	. scripts/run-pulumi.sh preview

pulumi-up:
	. scripts/run-pulumi.sh up

pulumi-destroy:
	. scripts/run-pulumi.sh destroy