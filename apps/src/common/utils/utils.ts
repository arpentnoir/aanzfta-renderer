import { format, isValid } from 'date-fns';

export const getValue = (id?: string): string => {
  if (!id) return '';
  const values = id.split(':');
  return values[values.length - 1];
};

export const formatDate = (date?: string): string => {
  if (!date) return '';
  const dValue = new Date(date);
  if (!isValid(dValue)) return '';
  return format(dValue, 'dd-MM-yyyy');
};
