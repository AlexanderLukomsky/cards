import { FC } from 'react';

import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';

import style from './registrationForm.module.scss';

import { StatusType } from 'common/types';
import { validationForm } from 'common/utils';
import {
  FormEmail,
  FormFooter,
  FormPassword,
  FormTitle,
} from 'components/form-components';
import { LoaderFullSize } from 'components/loader-full-size';
import { appPath } from 'components/routes/path';
import { useAppDispatch } from 'store/hooks';
import { registration } from 'store/reducers/auth-reducer';

export const RegistrationForm: FC<RegistrationFormPropsType> = ({
  registrationStatus,
}) => {
  const dispatch = useAppDispatch();
  const onEmailFocusHandler = (): void => {
    formik.setTouched({
      email: false,
      password: formik.touched.password && !!formik.errors.password,
      confirmPassword: formik.touched.confirmPassword && !!formik.errors.confirmPassword,
    });
  };
  const onPasswordFocusHandler = (): void => {
    formik.setTouched({
      password: false,
      email: formik.touched.email && !!formik.errors.email,
      confirmPassword: formik.touched.confirmPassword && !!formik.errors.confirmPassword,
    });
  };
  const onConfirmPassFocusHandler = (): void => {
    formik.setTouched({
      confirmPassword: false,
      password: formik.touched.password && !!formik.errors.password,
      email: formik.touched.email && !!formik.errors.email,
    });
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      return validationForm(values);
    },
    onSubmit: async values => {
      const action = await dispatch(
        registration({ email: values.email, password: values.password }),
      );

      if (registration.rejected.match(action)) {
        <Navigate to={appPath.MAIN} />;
      }
    },
  });

  return (
    <div className={style.registration_form}>
      <FormTitle title="Sign up" />
      <form className={style.form} onSubmit={formik.handleSubmit}>
        <FormEmail
          isError={formik.touched.email && !!formik.errors.email}
          errorText={formik.errors.email}
          onFocus={onEmailFocusHandler}
          fieldProps={formik.getFieldProps('email')}
          className={style.form__email}
        />
        <FormPassword
          isError={formik.touched.password && !!formik.errors.password}
          errorText={formik.errors.password}
          onFocus={onPasswordFocusHandler}
          fieldProps={formik.getFieldProps('password')}
          className={style.form__password}
        />
        <FormPassword
          isError={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
          errorText={formik.errors.confirmPassword}
          onFocus={onConfirmPassFocusHandler}
          fieldProps={formik.getFieldProps('confirmPassword')}
          className={style.form__password}
          label="Confirm password"
        />
        <FormFooter
          className={style.form__footer}
          onClick={formik.submitForm}
          buttonTitle="Sign Up"
          linkTitle="Sign In"
          pathTo={appPath.LOGIN}
          disabled={registrationStatus === 'pending'}
        >
          Already have an account
        </FormFooter>
      </form>
      {registrationStatus === 'pending' && <LoaderFullSize />}
    </div>
  );
};

type RegistrationFormPropsType = {
  registrationStatus: StatusType;
};
