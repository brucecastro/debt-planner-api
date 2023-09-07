import { Construct } from 'constructs'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway'

export class SmdApiService extends Construct {
  constructor (scope: Construct, id: string) {
    super(scope, id)

    const calculateFunction = new NodejsFunction(this, 'calculate', {
      entry: './src/calculate.ts'
    })

    // eslint-disable-next-line no-new
    new LambdaRestApi(this, 'smd-api', {
      handler: calculateFunction
    })
  }
}
