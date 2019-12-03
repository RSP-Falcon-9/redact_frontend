import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { getAuthToken, Method, callEditorApi } from "requests/api";
import {
    getEditorArticleDetailRequest,
    getEditorArticlesError,
    getEditorArticlesSuccess,
    getReviewersSuccess,
    getReviewersError,
    setReviewerToArticleRequest,
    setReviewerToArticleError,
    setReviewerToArticleSuccess,
    acceptArticleError,
    acceptArticleSuccess,
    acceptArticleRequest,
    denyArticleRequest,
    denyArticleError,
    denyArticleSuccess,
    getEditorArticleDetailError,
    getEditorArticleDetailSuccess,
    setReviewVisibilityRequest,
    setReviewVisibilityError,
    setReviewVisibilitySuccess} from "./actions";
import {
    EditorAction,
    GET_ARTICLES_URL,
    REVIEWERS_URL,
    assignReviewerEndpoint,
    acceptArticleEndpoint,
    denyArticleEndpoint,
    reviewVisibilityEndpoint} from "./types";
import { editorArticleDetailEndpoint } from "store/editor/types";

// requests

function* handleGetArticles() {
    try {
        const response = yield call(callEditorApi, Method.Get, GET_ARTICLES_URL, yield getAuthToken());

        if (response.error) {
            console.error(`There was error with get all articles: ${response.error}`);
            yield put(getEditorArticlesError(response));
        } else {
            yield put(getEditorArticlesSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`There was error with get all articles: ${error.stack}`);
            yield put(getEditorArticlesError({ error: error.name, message: error.message }));
        } else {
            yield put(getEditorArticlesError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

function* handleGetArticleDetail(action: ReturnType<typeof getEditorArticleDetailRequest>) {
    try {
        const response = yield call(callEditorApi, Method.Get,
            editorArticleDetailEndpoint(action.payload.articleId, action.payload.version), yield getAuthToken());

        if (response.error) {
            console.error(`There was error with get article detail: ${response.error}`);
            yield put(getEditorArticleDetailError(response.error));
        } else {
            yield put(getEditorArticleDetailSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`There was error with get article detail: ${error.stack}`);
            yield put(getEditorArticleDetailError({ error: error.name, message: error.message }));
        } else {
            yield put(getEditorArticleDetailError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

function* handleGetReviewers() {
    try {
        const response = yield call(callEditorApi, Method.Get, `${REVIEWERS_URL}`, yield getAuthToken());

        if (response.error) {
            console.error(`There was error with get reviewers: ${response.error}`);
            yield put(getReviewersError(response.error));
        } else {
            yield put(getReviewersSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`There was error with get reviewers: ${error.stack}`);
            yield put(getReviewersError({ error: error.name, message: error.message }));
        } else {
            yield put(getReviewersError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

function* handleSetReviewerToArticle(action: ReturnType<typeof setReviewerToArticleRequest>) {
    try {
        const response = yield call(callEditorApi, Method.Post,
            assignReviewerEndpoint(action.payload.articleId, action.payload.version), yield getAuthToken(), action.payload.data);

        if (response.error) {
            console.error(`There was error with set reviewer to article: ${response.error}`);
            yield put(setReviewerToArticleError(response));
        } else {
            yield put(setReviewerToArticleSuccess({ articleId: action.payload.articleId, version: action.payload.version, message: response.message }));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`There was error with set reviewer to article: ${error.stack}`);
            yield put(setReviewerToArticleError({ error: error.name, message: error.message }));
        } else {
            yield put(setReviewerToArticleError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

function* handleAcceptArticle(action: ReturnType<typeof acceptArticleRequest>) {
    try {
        const response = yield call(callEditorApi, Method.Post,
            acceptArticleEndpoint(action.payload.articleId, action.payload.version), yield getAuthToken());

        if (response.error) {
            console.error(`There was error with accepting article: ${response.error}`);
            yield put(acceptArticleError(response));
        } else {
            yield put(acceptArticleSuccess({ articleId: action.payload.articleId, version: action.payload.version, message: response.message }));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`There was error with accepting article: ${error.stack}`);
            yield put(acceptArticleError({ error: error.name, message: error.message }));
        } else {
            yield put(acceptArticleError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

function* handleDenyArticle(action: ReturnType<typeof denyArticleRequest>) {
    try {
        const response = yield call(callEditorApi, Method.Post,
            denyArticleEndpoint(action.payload.articleId, action.payload.version), yield getAuthToken());

        if (response.error) {
            console.error(`There was error denying an article: ${response.error}`);
            yield put(denyArticleError(response));
        } else {
            yield put(denyArticleSuccess({ articleId: action.payload.articleId, version: action.payload.version, message: response.message }));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`There was error denying an article: ${error.stack}`);
            yield put(denyArticleError({ error: error.name, message: error.message }));
        } else {
            yield put(denyArticleError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

function* handleSetReviewVisibility(action: ReturnType<typeof setReviewVisibilityRequest>) {
    try {
        const response = yield call(callEditorApi, Method.Get,
            reviewVisibilityEndpoint(action.payload.reviewId, action.payload.visibility), yield getAuthToken());

        if (response.error) {
            console.error(`There was error setting review visible: ${response.error}`);
            yield put(setReviewVisibilityError(response));
        } else {
            yield put(setReviewVisibilitySuccess({ reviewId: action.payload.reviewId, visibility: action.payload.visibility, message: response.message }));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`There was error setting review visible: ${error.stack}`);
            yield put(setReviewVisibilityError({ error: error.name, message: error.message }));
        } else {
            yield put(setReviewVisibilityError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

// watchers

function* watchGetArticlesRequest() {
    yield takeLatest(EditorAction.GET_ARTICLES, handleGetArticles);
}

function* watchGetArticleDetailRequest() {
    yield takeLatest(EditorAction.GET_ARTICLE_DETAIL, handleGetArticleDetail);
}

function* watchHandleReviewersRequest() {
    yield takeLatest(EditorAction.GET_REVIEWERS, handleGetReviewers);
}

function* watchHandleSetReviewerToArticle() {
    yield takeLatest(EditorAction.SET_REVIEWER_TO_ARTICLE, handleSetReviewerToArticle);
}

function* watchHandleAcceptArticle() {
    yield takeLatest(EditorAction.ACCEPT_ARTICLE, handleAcceptArticle);
}

function* watchHandleDenyArticle() {
    yield takeLatest(EditorAction.DENY_ARTICLE, handleDenyArticle);
}

function* watchSetReviewVisibility() {
    yield takeLatest(EditorAction.SET_REVIEW_VISIBILITY, handleSetReviewVisibility);
}

// merge

function* editorSaga() {
    yield all([
        fork(watchGetArticlesRequest),
        fork(watchGetArticleDetailRequest),
        fork(watchHandleReviewersRequest),
        fork(watchHandleSetReviewerToArticle),
        fork(watchHandleAcceptArticle),
        fork(watchHandleDenyArticle),
        fork(watchSetReviewVisibility),
    ]);
}

export default editorSaga;
