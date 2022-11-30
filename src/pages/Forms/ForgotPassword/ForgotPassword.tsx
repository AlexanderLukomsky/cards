import { useState } from "react";
import { NavLink } from "react-router-dom";
import { forgotPassword } from "../../../app/reducers/authReducer";
import { CheckEmail } from "../../../components/CheckEmail/CheckEmail";
import { CustomButton } from "../../../components/CustomButton";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { validator, ValidatorErrorType } from "../../../utils/validator";
import { _formPath } from "../../Routes/_path/formPath";
import { Form } from "../FormComponents/Form/Form";
import "./forgotPassword.scss";
export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.authStatus);
  const [emailValue, setEmailValue] = useState<string>("");
  const [errors, setErrors] = useState<ValidatorErrorType>({
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [successRequest, setSuccessRequest] = useState(false);
  const onSubmitForm = async () => {
    const errors = validator({ email: emailValue });
    if (errors.email) {
      setErrors(errors);
      return;
    }
    const data = {
      email: emailValue,
      from: "packs-api",
      message: `<div style="background: linear-gradient(180deg, #e6d4de, #9890c7); padding: 15px; border-radius:5px">
                     password recovery alexanderlukomsky.github.io/cards: 
                     <div>
                        <a style="font-weight:500; color:#2d2e46; text-transform:uppercase" href='https://alexanderlukomsky.github.io/cards/#/form/new-password/$token$'>
                           New Password
                        </a>
                     </div>
                  </div>`,
    };
    const action = await dispatch(forgotPassword(data));
    if (!forgotPassword.rejected.match(action)) {
      setSuccessRequest(true);
    }
  };
  return (
    <div className="password-recovery forms-form">
      {successRequest ? (
        <CheckEmail href={emailValue} />
      ) : (
        <>
          <Form
            title="Forgot your password?"
            errors={errors}
            errorsHandler={setErrors}
            email={emailValue}
            onChangeEmailValue={setEmailValue}
          />
          <span className="password-recovery__text">
            Enter your email address and we will send you further instructions{" "}
          </span>
          <CustomButton
            onClick={onSubmitForm}
            disabled={!!errors.email || authStatus === "loading"}
            className={"forms__submit-form"}
          >
            Send Instructions
          </CustomButton>
          <span className="password-recovery__text">
            Did you remember your password?
          </span>
          <NavLink
            className="password-recovery__link"
            to={`${_formPath.FORM}${_formPath.LOGIN}`}
          >
            Try logging in
          </NavLink>
        </>
      )}
    </div>
  );
};
