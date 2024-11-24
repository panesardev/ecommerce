import { Credentials } from "@app/auth/auth.interface";

export type LoginFormType = 'LOGIN' | 'SIGN_UP' | 'RESET_PASSWORD' ;

export interface LoginFormState {
  credentials: Credentials;
  type: LoginFormType;
}
