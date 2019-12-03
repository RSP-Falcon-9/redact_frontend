import { decode } from "jsonwebtoken";
import { Reducer } from "redux";
import { AuthAction, AuthResponse, AuthState, JWTTokenPayload } from "store/auth/types";
import { ErrorBaseResponse } from "requests/base-response";

const initialState: AuthState = {
    loading: false,
    message: "",
    error: undefined,
    authToken: "",
    userName: "",
    authTokenExpiration: new Date(),
    roles: [],
};

export const authReducer: Reducer<AuthState> =
    (state = initialState, action): AuthState => {
    switch (action.type) {
        case AuthAction.AUTH_REQUEST: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
            };
        }
        case AuthAction.AUTH_SUCCESS: {
            const authResponse = action.payload as AuthResponse;
            const jwtTokenString: string[] = authResponse.authorization.split(" ");
            if (jwtTokenString.length < 2 || jwtTokenString[0] !== "bearer") {
                return {
                    ...state,
                    loading: false,
                    message: "Wrong authorization token provided!",
                    error: "Parsing of authorization token failed",
                };
            }

            const jwtToken = decode(jwtTokenString[1]) as JWTTokenPayload;

            return {
                ...state,
                loading: false,
                message: authResponse.message,
                error: undefined,
                authToken: jwtTokenString[1],
                userName: jwtToken.sub,
                authTokenExpiration: jwtToken.exp,
                roles: jwtToken.roles,
            };
        }
        case AuthAction.AUTH_ERROR: {
            const authError = action.payload as ErrorBaseResponse;
            return {
                ...state,
                loading: false,
                message: authError.message,
                error: authError.error,
            };
        }
        case AuthAction.LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};
