import { FC } from 'react';

import { Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import style from './loginForm.module.scss';

import { StatusType } from 'common/types';
import { validator } from 'common/utils';
import {
  FormEmail,
  FormFooter,
  FormPassword,
  FormTitle,
} from 'components/form-components';
import { LoaderFullSize } from 'components/loader-full-size';
import { appPath } from 'components/routes/path';
import { useAppDispatch } from 'store/hooks';
import { setLogin } from 'store/reducers/auth-reducer/authReducer';

export const LoginForm: FC<LoginFormPropsType> = ({ loginStatus }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onEmailFocusHandler = (): void => {
    formik.setTouched({
      email: false,
      password: formik.touched.password && !!formik.errors.password,
    });
  };
  const onPasswordFocusHandler = (): void => {
    formik.setTouched({
      password: false,
      email: formik.touched.email && !!formik.errors.email,
    });
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      return validator(values);
    },
    onSubmit: async values => {
      const action = await dispatch(setLogin(values));

      if (setLogin.fulfilled.match(action)) {
        navigate(appPath.PROFILE);
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
          onFocus={onEmailFocusHandler}
          fieldProps={formik.getFieldProps('email')}
        />
        <FormPassword
          isError={formik.touched.password && !!formik.errors.password}
          errorText={formik.errors.password}
          onFocus={onPasswordFocusHandler}
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
