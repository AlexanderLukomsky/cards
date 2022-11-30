type FormikErrorsType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};
export const validator = (values: FormikErrorsType): FormikErrorsType => {
  const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const errors: FormikErrorsType = {};
  const maxPasswordLength = 8;

  if (!values.email) {
    errors.email = 'Required';
  } else if (!emailRegEx.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < maxPasswordLength) {
    errors.password = 'Password cannot be less than 8 characters';
  } else if (values.password && values.confirmPassword) {
    if (values.password !== values.confirmPassword) {
      errors.password = 'Passwords do not match';
    }
  } else {
    delete errors.password;
  }
  if (values.confirmPassword === '') {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword) {
    if (values.confirmPassword.length < maxPasswordLength) {
      errors.confirmPassword = 'Password cannot be less than 8 characters';
    } else if (values.confirmPassword && values.password) {
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
  }

  return errors;
};
