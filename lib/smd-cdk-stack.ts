import * as cdk from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import { Calculate } from './smd-service'

export class SmdCdkStack extends cdk.Stack {
  constructor (scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here
    // eslint-disable-next-line no-new
    new Calculate(this, 'smd-api')
  }
}
