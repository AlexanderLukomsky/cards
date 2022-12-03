import { FC, useState, useEffect } from 'react';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

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
import { registration, setNotice } from 'store/reducers/auth-reducer';

export const RegistrationForm: FC<RegistrationFormPropsType> = ({
  registrationStatus,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isSuccessfullyReg, setIsSuccessfullyReg] = useState(false);

  useEffect(() => {
    if (isSuccessfullyReg) {
      const id = setTimeout(() => {
        navigate(appPath.LOGIN);
        // eslint-disable-next-line no-magic-numbers
      }, 3000);

      return () => {
        clearTimeout(id);
      };
    }
  }, [isSuccessfullyReg, navigate]);

  const handleEmailFocus = (): void => {
    formik.setTouched({
      email: false,
      password: formik.touched.password && !!formik.errors.password,
      confirmPassword: formik.touched.confirmPassword && !!formik.errors.confirmPassword,
    });
  };
  const handlePasswordFocus = (): void => {
    formik.setTouched({
      password: false,
      email: formik.touched.email && !!formik.errors.email,
      confirmPassword: formik.touched.confirmPassword && !!formik.errors.confirmPassword,
    });
  };
  const handleConfirmPassFocus = (): void => {
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

      if (registration.fulfilled.match(action)) {
        dispatch(setNotice({ notice: 'registration completed successfully' }));
        setIsSuccessfullyReg(true);
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
          onFocus={handleEmailFocus}
          fieldProps={formik.getFieldProps('email')}
          className={style.form__email}
        />
        <FormPassword
          isError={formik.touched.password && !!formik.errors.password}
          errorText={formik.errors.password}
          onFocus={handlePasswordFocus}
          fieldProps={formik.getFieldProps('password')}
          className={style.form__password}
        />
        <FormPassword
          isError={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
          errorText={formik.errors.confirmPassword}
          onFocus={handleConfirmPassFocus}
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
