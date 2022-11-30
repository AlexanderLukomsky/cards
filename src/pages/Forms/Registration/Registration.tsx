import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registration } from "../../../app/reducers/authReducer";
import { CustomButton } from "../../../components/CustomButton";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { validator, ValidatorErrorType } from "../../../utils/validator";
import { _pagesPath } from "../../Routes/_path/pagesPath";
import { Form } from "../FormComponents/Form/Form";
import "./registration.scss";
export const Registration = () => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //state
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");
  const [errors, setErrors] = useState<ValidatorErrorType>({
    email: null,
    password: null,
    confirmPassword: null,
  });
  //submit
  const onSubmitForm = async () => {
    const errors = validator({
      email: emailValue,
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
    });
    if (errors.email || errors.password || errors.confirmPassword) {
      setErrors(errors);
      return;
    }
    const data = {
      email: emailValue,
      password: passwordValue,
    };
    const action = await dispatch(registration(data));
    if (!registration.rejected.match(action)) {
      navigate(_pagesPath.MAIN);
    }
  };
  return (
    <div className="registration forms-form">
      <Form
        title="Sign Up"
        errors={errors}
        errorsHandler={setErrors}
        email={emailValue}
        password={passwordValue}
        confirmPassword={confirmPasswordValue}
        onChangeEmailValue={setEmailValue}
        onChangePassValue={setPasswordValue}
        onChangeConfirmPassValue={setConfirmPasswordValue}
      />
      <div className="registration__buttons">
        <NavLink className={"registration__button-home"} to={_pagesPath.MAIN}>
          Home page
        </NavLink>
        <CustomButton
          onClick={onSubmitForm}
          disabled={
            !!errors.email ||
            !!errors.password ||
            !!errors.confirmPassword ||
            authState.authStatus === "loading"
          }
          className={"forms__submit-form"}
        >
          Register
        </CustomButton>
      </div>
    </div>
  );
};
