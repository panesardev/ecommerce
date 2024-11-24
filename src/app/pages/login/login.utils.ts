import { LoginFormState } from "./login.interface";

export function initialLoginFormState(): LoginFormState {
  return {
    type: 'LOGIN',
    credentials: {
      displayName: '',
      email: '',
      password: '',
    },
  };
}
