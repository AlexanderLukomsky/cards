import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import style from './registration.module.scss';

import { selectAuthNotice, selectAuthStatus } from 'common/selectors';
import { validationForm } from 'common/utils';
import { CustomizedSnackbar } from 'components/customized-snackbar';
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

export const Registration = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const notice = useSelector(selectAuthNotice);
  const status = useSelector(selectAuthStatus);

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
  const onCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
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
    <div className={style.registration}>
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
            pathTo={appPath.REGISTRATION}
            disabled={status === 'pending'}
          >
            Already have an account
          </FormFooter>
        </form>
        {status === 'pending' && <LoaderFullSize />}
      </div>
      <CustomizedSnackbar
        message={notice}
        onClose={onCloseSnackbar}
        isError={status === 'failed'}
        isOpen={!!notice}
      />
    </div>
  );
};
