import { type Context, type APIGatewayProxyResult, type APIGatewayEvent } from 'aws-lambda'

import { Convert, type Debt } from './model/Debt'
import { type StackedDebt } from './model/StackedDebt'
import { recalculateNpers } from './utils/nper'
import { getPayOffDate } from './utils/dates'

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  // console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  // console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  const { body, httpMethod } = event

  if (httpMethod !== 'POST') {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${httpMethod} method.`
    )
  }

  if (body == null || body === undefined) {
    throw new Error('body is null.')
  }

  let debts: Debt[]

  try {
    debts = Convert.toDebt(body)
  } catch {
    throw new Error('Invalid JSON')
  }

  // console.log('debts:', JSON.stringify(debts));

  let accelAmount = 0
  let nextDebt: StackedDebt
  const debtPlan: StackedDebt[] = []
  let availableDebts = debts
  const runningDate = new Date()

  for (let i = 0; i < debts.length; i++) {
    // console.log('in debt ' + debts[i].name);
    availableDebts = recalculateNpers(availableDebts, runningDate, accelAmount)
    availableDebts.sort((x: Debt, y: Debt) => x.projectedNPer - y.projectedNPer)
    // availableDebts.forEach(d => console.log(d.nper));
    // console.log('next debt: ');

    nextDebt = availableDebts.shift() as StackedDebt
    nextDebt.nper = nextDebt.projectedNPer
    nextDebt.accel_payment = accelAmount
    nextDebt.accel_date = getPayOffDate(runningDate, nextDebt.nper)
    runningDate.setMonth(nextDebt.accel_date.getMonth() + 1)
    accelAmount += nextDebt.min_payment + nextDebt.extra_payment
    debtPlan.push(nextDebt)
  }

  // const response = {
  //   statusCode: 200,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
  //   },
  //   body: JSON.stringify(debtPlan),
  // };

  return {
    statusCode: 200,
    body: JSON.stringify(debtPlan)
  }
}
