const monthDiff = (dateFrom:Date, dateTo:Date) => {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
};

const getPayOffDate = (start:Date, periods:number) => {
  return new Date(start.setMonth(start.getMonth() + Math.floor(periods)));
};

export {
  monthDiff,
  getPayOffDate
}