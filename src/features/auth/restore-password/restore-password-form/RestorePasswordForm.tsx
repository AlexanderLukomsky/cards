import { FC } from 'react';

import { useFormik } from 'formik';

import style from './restorePasswordForm.module.scss';

import { validationForm } from 'common/utils';
import { FormEmail, FormFooter, FormTitle } from 'components/form-components';
import { appPath } from 'components/routes/path';
import { useAppDispatch } from 'store/hooks';
import { restorePassword } from 'store/reducers/auth-reducer';

export const RestorePasswordForm: FC<RestorePasswordFormPropsType> = ({
  onSubmitHandler,
}) => {
  const dispatch = useAppDispatch();

  const handleEmailFocus = (): void => {
    formik.setTouched({
      email: false,
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      const errors = validationForm(values);

      if (errors.email) {
        return errors;
      }
    },
    onSubmit: async values => {
      const action = await dispatch(restorePassword(values.email));

      if (restorePassword.fulfilled.match(action)) {
        onSubmitHandler(values.email);
      }
    },
  });

  return (
    <div className={style.restore_password_form}>
      <FormTitle title="Forgot your password?" />
      <FormEmail
        isError={formik.touched.email && !!formik.errors.email}
        errorText={formik.errors.email}
        onFocus={handleEmailFocus}
        fieldProps={formik.getFieldProps('email')}
      />

      <p className={style.text}>
        Enter your email address and we will send you further instructions
      </p>
      <FormFooter
        onClick={formik.submitForm}
        buttonTitle="Send Instructions"
        linkTitle="Try logging in"
        pathTo={appPath.LOGIN}
      >
        <p>Did you remember your password?</p>
      </FormFooter>
    </div>
  );
};

type RestorePasswordFormPropsType = {
  onSubmitHandler: (value: string) => void;
};
