import {
  isJSON,
  isURL,
  isBase64,
  isIP,
  isHexadecimal,
  isAlpha,
  isAlphanumeric,
  contains,
  isDecimal,
  isEmpty,
  isEmail
} from 'validator';

const REQUIRED = (val: any) => val !== null && typeof val !== 'undefined' && !isEmpty(val.toString());
const EMAIL = (val: string) => (val !== '' && val ? isEmail(val.toString()) : true);
const MAX = (m: number) => (val: number | string) => (val ? isDecimal(val + '') && Number(val) <= m : true);
const MIN = (m: number) => (val: number | string) => (val ? isDecimal(val + '') && Number(val) >= m : true);
const IS_URL = (val: string) => isURL(val);
const IS_JSON = (val: string) => isJSON(val);
const IS_HEX = (val: string) => isHexadecimal(val);
const IS_ALPHA = (val: string) => (val ? isAlpha(val.toString()) : isAlpha(val));
const IS_ALPHANUMERIC = (val: string) => (val ? isAlphanumeric(val.toString()) : isAlphanumeric(val));
const IS_BASE64 = (val: string) => (val ? isBase64(val.toString()) : isBase64(val));
const IS_IP = (version: number = 4) => (val: string) => isIP(val, version);
const GT = (m: number) => (val: number | string) => (val ? isDecimal(val + '') && Number(val) > m : true);
const LT = (m: number) => (val: number | string) => (val ? isDecimal(val + '') && Number(val) < m : true);
const GTE = MIN;
const LTE = MAX;
const MIN_LENGTH = (m: number) => (val: number | string) => (val ? (val + '').length >= m : true);
const MAX_LENGTH = (m: number) => (val: number | string) => (val ? (val + '').length <= m : true);
const LENGTH = (l: number) => (val: number | string) => (val ? (val + '').length === l : l === 0);
const CONTAINS = (seed: string) => (val: number | string) => (val ? contains(val + '', seed) : true);

export default {
  REQUIRED,
  EMAIL,
  MAX,
  MIN,
  IS_URL,
  IS_JSON,
  IS_HEX,
  IS_ALPHA,
  IS_ALPHANUMERIC,
  IS_BASE64,
  IS_IP,
  GT,
  LT,
  GTE,
  LTE,
  MIN_LENGTH,
  MAX_LENGTH,
  LENGTH,
  CONTAINS
};
