import { action } from "typesafe-actions";
import { AuthActionTypes, AuthRequest, AuthResponse } from "store/auth/types";

export const authRequest = (credentials: AuthRequest) => action(AuthActionTypes.AUTH_REQUEST, credentials);
export const authSuccess = (data: AuthResponse) => action(AuthActionTypes.AUTH_SUCCESS, data);
export const authError = (message: string) => action(AuthActionTypes.AUTH_ERROR, message);
export const logout = () => action(AuthActionTypes.LOGOUT);
