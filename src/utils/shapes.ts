import { date, number } from 'yup';

export const dateShape = date()
  .nullable()
  .transform((current, original) => (original === '' ? null : current));

export const numberShape = number().transform((val) =>
  isNaN(val) ? undefined : val
);
