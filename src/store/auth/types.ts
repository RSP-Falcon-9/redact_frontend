import { BaseResponse } from "requests/base-response";

export enum AuthAction {
    AUTH_REQUEST = "@@auth/authorization",
    AUTH_SUCCESS = "@@auth/authorizationSuccess",
    AUTH_ERROR = "@@auth/authorizationError",

    LOGOUT = "@@auth/logout",
}

export interface AuthRequest {
    userName: string;
    password: string;
}

export interface AuthResponse extends BaseResponse {
    authorization: string;
}

export interface JWTTokenPayload {
    iss: string;
    aud: string;
    sub: string;
    exp: Date;
    roles: string[];
}

export interface AuthState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
    readonly authToken: string;
    readonly userName: string;
    readonly authTokenExpiration: Date;
    readonly roles: string[];
}
