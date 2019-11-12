import { connectRouter } from "connected-react-router";
import { History } from "history";
import { Action, AnyAction, combineReducers, Dispatch } from "redux";
import { all, fork } from "redux-saga/effects";
import { adminReducer } from "./admin/reducers";
import adminSaga from "./admin/sagas";
import { AdminState } from "./admin/types";
import { authReducer } from "./auth/reducers";
import authSaga from "./auth/sagas";
import { AuthState } from "./auth/types";
import { navigationReducer } from "./navigation/reducers";
import { NavigationState } from "./navigation/types";

export interface ApplicationState {
    auth: AuthState;
    navigation: NavigationState;
    admin: AdminState;
    router: any;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>;
}

export const createRootReducer = (history: History) =>
    combineReducers<ApplicationState>({
        auth: authReducer,
        navigation: navigationReducer,
        admin: adminReducer,
        router: connectRouter(history),
    });

export function* rootSaga() {
    yield all([fork(authSaga), fork(adminSaga)]);
}
