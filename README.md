# Introduction

Defines schemas and renderers for HA-DVP

## Available Scripts

In the renderer, you can run:

### `npm install`

### `npm run lint`

### `npm run test`

### `npm run build`

# Deployment

Prerequisites:

- AWS credentials configured for CLI access to the `gs-jump` AWS account (see [AWS link](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) for instructions on configuring credentials)

Deploying with Pulumi:

```
# Mac/Linux
make pulumi-preview
make pulumi-up
```
