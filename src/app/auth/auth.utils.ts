import { GithubAuthProvider, GoogleAuthProvider } from "@angular/fire/auth";
import { AuthProviderName, UserData } from "./auth.interface";

export function createUserData(): UserData {
  return {
    products: [],
    orders: [],
  };
}

export function getAuthProvider(name: AuthProviderName) {
  switch (name) {
    case 'google': return new GoogleAuthProvider();
    case 'github': return new GithubAuthProvider();
    default: throw Error('Auth provider not supported');
  }
}
