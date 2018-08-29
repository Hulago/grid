import moment from 'moment';
export const toDate = (value: string, format: string = 'DD/MM/YYYY', timezone: number | undefined = undefined) => {
  const tz = timezone || new Date().getTimezoneOffset() / -60;
  const local = moment.utc(value).utcOffset(tz);
  return local.format(format);
};

export const toDateTime = (
  value: string,
  format: string = 'DD/MM/YYYY HH:mm:ss',
  timezone: number | undefined = undefined
) => {
  return toDate(value, format, timezone);
};
