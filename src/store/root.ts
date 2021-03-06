import { connectRouter } from "connected-react-router";
import { History } from "history";
import { Action, AnyAction, combineReducers, Dispatch } from "redux";
import { all, fork } from "redux-saga/effects";
import { createUserReducer, deleteUserReducer, getAllUsersStateReducer } from "./admin/reducers";
import adminSaga from "./admin/sagas";
import { AdminState } from "./admin/types";
import { getArticleFileStateReducer } from "./articles/reducers";
import articleSaga from "./articles/sagas";
import { ArticleState } from "./articles/types";
import { authReducer } from "./auth/reducers";
import authSaga from "./auth/sagas";
import { AuthState } from "./auth/types";
import { appealReviewStateReducer, createArticleStateReducer, getAuthorArticleDetailStateReducer, getAuthorArticlesStateReducer, updateArticleStateReducer } from "./author/reducers";
import authorSaga from "./author/sagas";
import { AuthorState } from "./author/types";
import { archiveEditionStateReducer, createEditionStateReducer, deleteEditionStateReducer } from "./chiefeditor/reducers";
import { ChiefEditorState } from "./chiefeditor/types";
import { acceptArticleReducer, denyArticleReducer, getEditorArticleDetailStateReducer, getEditorArticlesStateReducer, getReviewersStateReducer, setReviewerToArticleStateReducer, setReviewVisibilityReducer, setArticleEditionStateReducer } from "./editor/reducers";
import editorSaga from "./editor/sagas";
import { EditorState } from "./editor/types";
import { navigationReducer } from "./navigation/reducers";
import { NavigationState } from "./navigation/types";
import { getReviewerArticleDetailStateReducer, getReviewerArticlesStateReducer, reviewArticleStateReducer } from "./reviewer/reducers";
import reviewerSaga from "./reviewer/sagas";
import { ReviewerState } from "./reviewer/types";
import { getArchivesStateReducer, getEditionsStateReducer } from "./unauthenticated/reducers";
import unauthenticatedSaga from "./unauthenticated/sagas";
import { UnauthenticatedState } from "./unauthenticated/types";
import chiefEditorSaga from "./chiefeditor/sagas";

export interface ApplicationState {
    readonly auth: AuthState;
    readonly navigation: NavigationState;
    readonly articles: ArticleState;
    readonly admin: AdminState;
    readonly author: AuthorState;
    readonly editor: EditorState;
    readonly reviewer: ReviewerState;
    readonly unauthenticated: UnauthenticatedState;
    readonly chiefEditor: ChiefEditorState;
    readonly router: any;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>;
}

export const createRootReducer = (history: History) =>
    combineReducers<ApplicationState>({
        auth: authReducer,
        navigation: navigationReducer,
        articles: combineReducers<ArticleState>({
            getArticleFile: getArticleFileStateReducer,
        }),
        admin: combineReducers<AdminState>({
            getAllUsers: getAllUsersStateReducer,
            createUser: createUserReducer,
            deleteUser: deleteUserReducer,
        }),
        author: combineReducers<AuthorState>({
            getArticles: getAuthorArticlesStateReducer,
            createArticle: createArticleStateReducer,
            updateArticle: updateArticleStateReducer,
            getArticleDetail: getAuthorArticleDetailStateReducer,
            appealReview: appealReviewStateReducer,
        }),
        editor: combineReducers<EditorState>({
           getEditorArticles: getEditorArticlesStateReducer,
           getEditorArticleDetail: getEditorArticleDetailStateReducer,
           getReviewers: getReviewersStateReducer,
           setReviewerToArticle: setReviewerToArticleStateReducer,
           acceptArticle: acceptArticleReducer,
           denyArticle: denyArticleReducer,
           setReviewVisibility: setReviewVisibilityReducer,
           setArticleEdition: setArticleEditionStateReducer,
        }),
        reviewer: combineReducers<ReviewerState>({
            getReviewerArticles: getReviewerArticlesStateReducer,
            getReviewerArticleDetail: getReviewerArticleDetailStateReducer,
            reviewArticle: reviewArticleStateReducer,
        }),
        unauthenticated: combineReducers<UnauthenticatedState>({
            archivesState: getArchivesStateReducer,
            getEditionsState: getEditionsStateReducer,
        }),
        chiefEditor: combineReducers<ChiefEditorState>({
            createEditionState: createEditionStateReducer,
            deleteEditionState: deleteEditionStateReducer,
            archiveEditionState: archiveEditionStateReducer,
        }),
        router: connectRouter(history),
    });

export function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(articleSaga),
        fork(adminSaga),
        fork(authorSaga),
        fork(editorSaga),
        fork(reviewerSaga),
        fork(unauthenticatedSaga),
        fork(chiefEditorSaga),
    ]);
}
