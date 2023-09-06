import { type Debt } from './Debt'

export interface StackedDebt extends Debt {
  nper: number
  accel_payment: number
  accel_date: Date
}
