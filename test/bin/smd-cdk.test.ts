import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import * as SmdApiCdk from '../../lib/smd-api-cdk-stack'

describe('Test SMD CDK Constructs', () => {
  const app = new cdk.App()
  const stack = new SmdApiCdk.SmdApiCdkStack(app, 'MyTestStack')
  const template = Template.fromStack(stack)

  it('should create the SMD API Gateway', () => {
    template.hasResource('AWS::ApiGateway::RestApi', {})
  })

  it('should create the Lambda Function', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.handler'
    })
  })
})
