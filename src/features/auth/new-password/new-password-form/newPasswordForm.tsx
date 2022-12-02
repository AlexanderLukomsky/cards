import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

import style from './newPasswordForm.module.scss';

import { validationForm } from 'common/utils';
import { FormFooter, FormPassword } from 'components/form-components';
import { useAppDispatch } from 'store/hooks';
import { setNewPassword } from 'store/reducers/auth-reducer';

export const NewPasswordForm = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const params = useParams();
  const token = params.token as string;

  const handlePasswordFocus = (): void => {
    formik.setTouched({
      password: false,
    });
  };
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: values => {
      const errors = validationForm(values);

      if (errors.password) {
        return errors;
      }
    },
    onSubmit: async values => {
      const action = await dispatch(
        setNewPassword({ password: values.password, resetPasswordToken: token }),
      );

      if (setNewPassword.fulfilled.match(action)) {
        console.log('true');
      }
    },
  });

  return (
    <div className={style.new_password_form}>
      <FormPassword
        isError={formik.touched.password && !!formik.errors.password}
        errorText={formik.errors.password}
        onFocus={handlePasswordFocus}
        fieldProps={formik.getFieldProps('password')}
      />
      <p className={style.text}>
        Create new password and we will send you further instructions to email
      </p>
      <FormFooter onClick={formik.submitForm} buttonTitle="Create new password" />
    </div>
  );
};
