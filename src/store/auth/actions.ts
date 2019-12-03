import { action } from "typesafe-actions";
import { AuthAction, AuthRequest, AuthResponse } from "store/auth/types";
import { ErrorBaseResponse } from "requests/base-response";

export const authRequest = (credentials: AuthRequest) => action(AuthAction.AUTH_REQUEST, credentials);
export const authSuccess = (response: AuthResponse) => action(AuthAction.AUTH_SUCCESS, response);
export const authError = (errorResponse: ErrorBaseResponse) => action(AuthAction.AUTH_ERROR, errorResponse);
export const logout = () => action(AuthAction.LOGOUT);
