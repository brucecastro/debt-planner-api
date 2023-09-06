import { type Debt } from '../model/Debt'
import { monthDiff } from './dates'

const START_DATE = new Date()

const nperRevolving = (rate: number, paymentAmount: number, presentValue: number): number => {
  // console.log(`is revolving. rate: ${rate}, presentValue: ${presentValue}, payment: ${paymentAmount}`);
  let balance = presentValue
  let periods = 0

  for (; balance > 0; periods++) {
    balance = balance - (paymentAmount - balance * (rate / 1200))

    // console.log('period: ' + periods + ', balance: ' + balance)
  }

  // return decimal to perform more accurate comparisons
  const remainder = Math.abs(paymentAmount / (balance * 100))

  return periods + remainder
}

const nper = (rate: number, paymentAmount: number, presentValue: number, revolving = false): number => {
  if (rate === 0) return presentValue / paymentAmount

  if (revolving) return nperRevolving(rate, paymentAmount, presentValue)

  rate = rate / 1200

  return (
    Math.log(paymentAmount / rate / (paymentAmount / rate + presentValue)) /
    Math.log(1 - rate)
  )
}

const recalculateNpers = (debts: Debt[], runningDate: Date, accelAmt: number): Debt[] => {
  const paidPeriods = monthDiff(START_DATE, runningDate)

  return debts.map((d) => {
    // TODO: Is the following correct?
    const balance = d.balance - paidPeriods * (d.min_payment + d.extra_payment)
    d.projectedNPer = nper(
      d.interest_rate,
      d.min_payment + d.extra_payment + accelAmt,
      balance,
      d.type === 'revolving'
    )

    return d
  })
}

export {
  nper,
  nperRevolving,
  recalculateNpers
}
