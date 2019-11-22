import { connectRouter } from "connected-react-router";
import { History } from "history";
import { Action, AnyAction, combineReducers, Dispatch } from "redux";
import { all, fork } from "redux-saga/effects";
import { createUserReducer, deleteUserReducer, getAllUsersStateReducer } from "./admin/reducers";
import adminSaga from "./admin/sagas";
import { AdminState } from "./admin/types";
import { getArticlesStateReducer } from "./articles/reducers";
import articleSaga from "./articles/sagas";
import { ArticleState } from "./articles/types";
import { authReducer } from "./auth/reducers";
import authSaga from "./auth/sagas";
import { AuthState } from "./auth/types";
import { createArticleStateReducer, getAuthorArticleDetailStateReducer, getAuthorArticlesStateReducer, getAuthorArticleFileStateReducer } from "./author/reducers";
import authorSaga from "./author/sagas";
import { AuthorState } from "./author/types";
import { navigationReducer } from "./navigation/reducers";
import { NavigationState } from "./navigation/types";

export interface ApplicationState {
    readonly auth: AuthState;
    readonly navigation: NavigationState;
    readonly admin: AdminState;
    readonly author: AuthorState;
    readonly articles: ArticleState;
    readonly router: any;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>;
}

export const createRootReducer = (history: History) =>
    combineReducers<ApplicationState>({
        auth: authReducer,
        navigation: navigationReducer,
        admin: combineReducers<AdminState>({
            getAllUsers: getAllUsersStateReducer,
            createUser: createUserReducer,
            deleteUser: deleteUserReducer,
        }),
        author: combineReducers<AuthorState>({
            getArticles: getAuthorArticlesStateReducer,
            createArticle: createArticleStateReducer,
            getArticleDetail: getAuthorArticleDetailStateReducer,
            getArticleFile: getAuthorArticleFileStateReducer,
        }),
        articles: combineReducers<ArticleState>({
            getArticles: getArticlesStateReducer,
        }),
        router: connectRouter(history),
    });

export function* rootSaga() {
    yield all([fork(authSaga), fork(adminSaga), fork(authorSaga), fork(articleSaga)]);
}
