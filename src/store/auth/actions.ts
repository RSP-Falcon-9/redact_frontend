import { action } from "typesafe-actions";
import { AuthAction, AuthRequest, AuthResponse } from "store/auth/types";

export const authRequest = (credentials: AuthRequest) => action(AuthAction.AUTH_REQUEST, credentials);
export const authSuccess = (data: AuthResponse) => action(AuthAction.AUTH_SUCCESS, data);
export const authError = (message: string) => action(AuthAction.AUTH_ERROR, message);
export const logout = () => action(AuthAction.LOGOUT);
