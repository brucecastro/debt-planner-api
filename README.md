# Debt Planner API - Serverless on AWS (CDK)

This is the API for the Debt Planner, a tool to help optimize the complete payment of all debts, by providing a detailed payment plan.

It is implemented in Node.js as a serverless application using AWS CDK.

## Setup

To develop, test locally, and deply, the following tools are required:

* AWS CLI - [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) and [configure it with your AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).
* AWS SAM CLI - [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community).

The AWS SAM command line interface (CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run the functions in an Amazon Linux environment that matches Lambda. It can also emulate the application's build environment and API.

If you prefer to use an integrated development environment (IDE) to build and test the application, you can use the AWS Toolkit.
The AWS Toolkit is an open-source plugin for popular IDEs that uses the AWS SAM CLI to build and deploy serverless applications on AWS. The AWS Toolkit also adds step-through debugging for Lambda function code.

To get started, see the following:

* [PyCharm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [IntelliJ](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [VS Code](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/welcome.html)
* [Visual Studio](https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/welcome.html)

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Build and test locally

1. Make sure to compile typescript with `npm run build`

```bash
$ npm run build
```

2. Compile the CDK app and create a AWS CloudFormation template

```bash
$ cdk synth --no-staging > template.yaml
```

3. Use AWS SAM CLI to emulate the application's API, and run locally on port 3000

```bash
$ sam local start-api
$ curl http://localhost:3000/
```

### Test a single function

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `test/mock` folder.

After generating the AWS Cloudformation template, find the logical ID of the Lambda function in `template.yaml`. It will look like *smdapicalculate6E121A71*, where *6E121A71* represents an 8-character unique ID that the AWS CDK generates for all resources. The line right after it should look like `Type: AWS::Lambda::Function`.

AWS SAM CLI assumes the source code is in the same local directory as `template.yaml`.

To test the function, call:

```bash
$ sam local invoke smdapicalculate6E121A71 --event test/mock/event-calculate.json
```