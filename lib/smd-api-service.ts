import { Construct } from 'constructs'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { LambdaRestApi, Cors } from 'aws-cdk-lib/aws-apigateway'

export class SmdApiService extends Construct {
  constructor (scope: Construct, id: string) {
    super(scope, id)

    const calculateFunction = new NodejsFunction(this, 'calculate', {
      entry: './src/calculate.ts'
    })

    // eslint-disable-next-line no-new
    new LambdaRestApi(this, 'smd-api', {
      handler: calculateFunction,
      defaultCorsPreflightOptions: {
        allowOrigins: ['https://app.mydebtplanner.com', 'http://localhost:3001'],
        allowMethods: Cors.ALL_METHODS
      },
      deployOptions: {
        methodOptions: {
          '/*/*': {
            throttlingBurstLimit: 10,
            throttlingRateLimit: 5
          }
        }
      }
    })
  }
}
