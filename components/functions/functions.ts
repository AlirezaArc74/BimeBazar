import * as Yup from 'yup';

export const isIranianNationalIdValid = (value: string): boolean => {
  const nationalIdRegex = /^\d{10}$/;

  if (!nationalIdRegex.test(value)) {
    throw new Yup.ValidationError('لطفاً کد ملی را به درستی وارد کنید', value, 'nationalId');
  }

  const check = parseInt(value[9], 10);
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(value.charAt(i), 10) * (10 - i);
  }

  let remainder = sum % 11;

  if ((remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder)) {
    return true;
  }

  throw new Yup.ValidationError('لطفاً کد ملی معتبر وارد کنید', value, 'nationalId');
};


