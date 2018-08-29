export const bytes = (value: string | number) => {
  let n = Number(value);

  if (n < 1024) {
    return n;
  }

  n = n / 1024;

  if (n < 1024) {
    return Math.round(n) + 'KB';
  }

  n = n / 1024;

  if (n < 1024) {
    return Math.round(n) + 'MB';
  }

  n = n / 1024;

  if (n < 1024) {
    return Math.round(n) + 'GB';
  }

  n = n / 1024;

  if (n < 1024) {
    return Math.round(n) + 'TB';
  }

  n = n / 1024;

  if (n < 1024) {
    return Math.round(n) + 'PB';
  }

  return n;
};
