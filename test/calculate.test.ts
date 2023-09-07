import { type APIGatewayProxyEvent, type Context } from 'aws-lambda'
import { handler } from '../src/calculate'
import * as debtsJson from './mock/debts.json'
import * as debtsStackedJson from './mock/debts-stacked.json'

describe('Test SMD API logic', () => {
  const event: Partial<APIGatewayProxyEvent> = {
    httpMethod: 'POST',
    body: JSON.stringify(debtsJson)
  }

  const context: Partial<Context> = {
    awsRequestId: 'someReqId'
  }

  it('should return a result', async () => {
    const result = await handler(event as APIGatewayProxyEvent, context as Context)

    // Simply compares the order for now
    const resultStacked = JSON.parse(result.body).map((a: any) => a.name)

    expect(result.statusCode).toEqual(200)
    expect(resultStacked).toHaveLength(debtsStackedJson.length)
  })

  it('should calculate the correct stacking order', async () => {
    const result = await handler(event as APIGatewayProxyEvent, context as Context)

    // Compares the order for now
    const resultStacked = JSON.parse(result.body).map((a: any) => a.name)
    const expectedStacked = debtsStackedJson.map((a) => a.name)

    expect(resultStacked).toEqual(expectedStacked)
  })
})
