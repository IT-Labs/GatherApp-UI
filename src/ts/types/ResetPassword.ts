export type ResetPassword = {
  token: string | undefined;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePasswordType = {
  Id: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
