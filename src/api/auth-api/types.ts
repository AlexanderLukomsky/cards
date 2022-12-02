export type LoginRequestDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type UpdateProfileRequestDataType = {
  name?: string;
  avatar?: string;
};

export type RegistrationRequestDataType = {
  email: string;
  password: string;
};

export type RestorePasswordRequestDataType = {
  email: string;
  from: string;
  message: string;
};
export type NewPasswordRequestDataType = {
  password: string;
  resetPasswordToken: string;
};
