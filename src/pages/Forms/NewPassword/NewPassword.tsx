import { useState } from "react"
import { useParams } from "react-router-dom"
import { setNewPassword } from "../../../App/reducers/authReducer";
import { CustomButton } from "../../../Components/CustomButton";
import { SuccessMessage } from "../../../Components/SuccessMessage/SuccessMessage";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { validator, ValidatorErrorType } from "../../../utils/validator";
import { Form } from "../FormComponents/Form/Form";
export const NewPassword = () => {
   const { token } = useParams<{ token: string }>()
   const { authStatus } = useAppSelector(state => state.auth)
   const [successRequest, setSuccessRequest] = useState(false)
   const dispatch = useAppDispatch()
   const [errors, setErrors] = useState<ValidatorErrorType>({ email: null, password: null, confirmPassword: null })
   const [passwordValue, setPasswordValue] = useState<string>('')
   const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('')
   //submit
   const onSubmitForm = async () => {
      const errors = validator({ password: passwordValue, confirmPassword: confirmPasswordValue })
      if (errors.password || errors.confirmPassword) {
         setErrors(errors)
         return
      }
      if (!token) { return }
      const data = {
         password: passwordValue,
         resetPasswordToken: token
      }
      const action = await dispatch(setNewPassword(data))
      if (!setNewPassword.rejected.match(action)) {
         setSuccessRequest(true)
      }
   }
   return (
      <div className="new-password forms-form">
         {
            successRequest ?
               <SuccessMessage /> :
               <>
                  <Form
                     title="Create new password"
                     errors={errors}
                     password={passwordValue}
                     confirmPassword={confirmPasswordValue}
                     errorsHandler={setErrors}
                     onChangePassValue={setPasswordValue}
                     onChangeConfirmPassValue={setConfirmPasswordValue}
                  />
                  <div className="new-password__buttons">
                     <CustomButton
                        onClick={onSubmitForm}
                        disabled={!!errors.email || !!errors.password || !!errors.confirmPassword || authStatus === 'loading'}
                        className={"forms__submit-form"} >
                        Create new password
                     </CustomButton>
                  </div>
               </>
         }
      </div>
   )
}