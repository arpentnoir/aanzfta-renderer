SHELL := /bin/bash

# Default env variables
APP_NAME = ha-dvp-schema-registry
ENV ?= dev

AWS_REGION ?= ap-southeast-2
AWS_ACCOUNT_ID ?= 580315648792
AWS_ROLENAME ?= codeontap-automation
PULUMI_STATE_URL ?= s3://${AWS_ACCOUNT_ID}-pulumi-state
PULUMI_CONFIG_PASSPHRASE ?= 
TARGET_DOMAIN ?= dvp.ha.showthething.com
DVP_RENDERER_DOMAIN ?= renderer.${ENV}.${TARGET_DOMAIN}


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