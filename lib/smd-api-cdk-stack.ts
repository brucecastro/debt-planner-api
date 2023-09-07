import * as cdk from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import { SmdApiService } from './smd-api-service'

export class SmdApiCdkStack extends cdk.Stack {
  constructor (scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here
    // eslint-disable-next-line no-new
    new SmdApiService(this, 'smd-api')
  }
}
