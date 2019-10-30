import { connectRouter } from "connected-react-router";
import { History } from "history";
import { Action, AnyAction, combineReducers, Dispatch } from "redux";
import { all, fork } from "redux-saga/effects";
import { authReducer } from "./auth/reducers";
import authSaga from "./auth/sagas";
import { AuthState } from "./auth/types";

export interface ApplicationState {
    auth: AuthState;
    router: any;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>;
}

export const createRootReducer = (history: History) =>
    combineReducers<ApplicationState>({
        auth: authReducer,
        router: connectRouter(history),
    });

export function* rootSaga() {
    yield all([fork(authSaga)]);
}
