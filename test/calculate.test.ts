import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handler } from '../src/calculate';
import * as debtsJson from './mock/debts.json';
import * as debtsStackedJson from './mock/debts-stacked.json';

describe('Test calculateStack', () => {
    it('should calculate the correct stacking order', async () => {
    
      const event: Partial<APIGatewayProxyEvent> = {
        httpMethod: 'POST',
        body: JSON.stringify(debtsJson),
      };

      const context: Partial<Context> = {
        awsRequestId: 'someReqId'
      }
  
      const result = await handler(event as APIGatewayProxyEvent, context as Context);
  // console.log(result);
      // Simply compares the order for now
      
      const resultStacked = JSON.parse(result.body).map((a: any) => a.name);
      const expectedStacked = debtsStackedJson.map((a) => a.name);
  
      expect(result.statusCode).toEqual(200);
      expect(resultStacked).toHaveLength(expectedStacked.length);
      expect(resultStacked).toEqual(expectedStacked);
    });
  });
  