import { FC } from 'react';

import { Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import style from './loginForm.module.scss';

import { instance } from 'api/instance';
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
import { login } from 'store/reducers/auth-reducer';

export const LoginForm: FC<LoginFormPropsType> = ({ loginStatus }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const PASSWORD =
    instance.defaults.baseURL === process.env.REACT_APP_BACK_URL
      ? '123123123'
      : '12312311';

  const handleEmailFocus = (): void => {
    formik.setTouched({
      email: false,
      password: formik.touched.password && !!formik.errors.password,
    });
  };
  const handlePasswordFocus = (): void => {
    formik.setTouched({
      password: false,
      email: formik.touched.email && !!formik.errors.email,
    });
  };
  const formik = useFormik({
    initialValues: {
      email: '12qqqq3@mail.ru',
      password: PASSWORD,
      rememberMe: false,
    },
    validate: values => {
      return validationForm(values);
    },
    onSubmit: async values => {
      const action = await dispatch(login(values));

      if (login.fulfilled.match(action)) {
        navigate(appPath.PACKS);
      }
    },
  });

  return (
    <div className={style.login_form}>
      <FormTitle title="Sign in" />
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

        <label className={style.form__remember} htmlFor="rememberMe">
          <Checkbox id="rememberMe" {...formik.getFieldProps('rememberMe')} />
          Remember me
        </label>
        <NavLink to={appPath.RESTORE_PASSWORD} className={style.form__forgot}>
          Forgot Password?
        </NavLink>
        <FormFooter
          className={style.form__footer}
          onClick={formik.submitForm}
          buttonTitle="Sign In"
          linkTitle="Sign Up"
          pathTo={appPath.REGISTRATION}
          disabled={loginStatus === 'pending'}
        >
          Don&apos;t have an account yet?
        </FormFooter>
      </form>
      {loginStatus === 'pending' && <LoaderFullSize />}
    </div>
  );
};

type LoginFormPropsType = {
  loginStatus: StatusType;
};
