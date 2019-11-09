import { decode } from "jsonwebtoken";
import { Reducer } from "redux";
import { AuthActionTypes, AuthResponse, AuthState, JWTTokenPayload } from "store/auth/types";

const initialState: AuthState = {
    loading: false,
    authToken: "",
    userName: "",
    authTokenExpiration: new Date(),
    roles: [],
    errors: undefined,
};

export const authReducer: Reducer<AuthState> = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionTypes.AUTH_REQUEST: {
            return { ...state, loading: true, errors: undefined };
        }
        case AuthActionTypes.AUTH_SUCCESS: {
            const typedAction = action.payload as AuthResponse;
            const jwtTokenString: string[] = typedAction.authorization.split(" ");
            if (jwtTokenString.length < 2 || jwtTokenString[0] !== "bearer") {
                return { ...state, loading: false, errors: "Wrong authorization token provided!" };
            }

            const jwtToken = decode(jwtTokenString[1]) as JWTTokenPayload;

            return { ...state, loading: false, authToken: jwtTokenString[1],
                userName: jwtToken.sub, authTokenExpiration: jwtToken.exp, roles: jwtToken.roles, errors: undefined };
        }
        case AuthActionTypes.AUTH_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        case AuthActionTypes.LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};
