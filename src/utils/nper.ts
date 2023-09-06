import { Debt } from "../model/Debt";

const START_DATE = new Date();

const nperRevolving = (rate: number, payment_amt: number, present_val: number) => {
  // console.log(`is revolving. rate: ${rate}, present_val: ${present_val}, payment: ${payment_amt}`);
  let balance = present_val;
  let periods = 0;

  for (; balance > 0; periods++) {
    balance = balance - (payment_amt - balance * (rate / 1200));

    // console.log('period: ' + periods + ', balance: ' + balance)
  }

  // return decimal to perform more accurate comparisons
  const remainder = Math.abs(payment_amt / (balance * 100));

  return periods + remainder;
};

const nper = (rate: number, payment_amt: number, present_val: number, revolving = false) => {
  if (rate == 0) return present_val / payment_amt;

  if (revolving) return nperRevolving(rate, payment_amt, present_val);

  rate = rate / 1200;

  return (
    Math.log(payment_amt / rate / (payment_amt / rate + present_val)) /
    Math.log(1 - rate)
  );
};

const recalculateNpers = (debts:Array<Debt>, runningDate:Date, accelAmt:number) => {
  const { monthDiff } = require('./dates');
  const paidPeriods = monthDiff(START_DATE, runningDate);

  return debts.map((d) => {
    // TODO: Is the following correct?
    let balance = d.balance - paidPeriods * (d.min_payment + d.extra_payment);
    d.projectedNPer = nper(
      d.interest_rate,
      d.min_payment + d.extra_payment + accelAmt,
      balance,
      d.type == 'revolving'
    );

    return d;
  });
};

export {
  nper,
  nperRevolving,
  recalculateNpers
}