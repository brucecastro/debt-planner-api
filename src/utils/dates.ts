const monthDiff = (dateFrom: Date, dateTo: Date): number => {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  )
}

const getPayOffDate = (start: Date, periods: number): Date => {
  return new Date(start.setMonth(start.getMonth() + Math.floor(periods)))
}

export {
  monthDiff,
  getPayOffDate
}
