import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { getAuthToken, Method, callEditorApi } from "utils/api";
import { getEditorArticleDetailRequest, getEditorArticlesError, getEditorArticlesSuccess, getReviewersSuccess, getReviewersError, setReviewerToArticleRequest, setReviewerToArticleError, setReviewerToArticleSuccess } from "./actions";
import { ARTICLE_URL, EditorAction, GET_ARTICLES_URL, REVIEWERS_URL, reviewEndpoint } from "./types";

// requests

function* handleGetArticles() {
    try {
        const response = yield call(callEditorApi, Method.Get, GET_ARTICLES_URL, yield getAuthToken());

        if (response.error) {
            console.error("There was error with get all articles: " + response.error);
            yield put(getEditorArticlesError(response.error));
        } else {
            yield put(getEditorArticlesSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with get all articles: " + error.stack!);
            yield put(getEditorArticlesError(error.name));
        } else {
            yield put(getEditorArticlesError("There was an unknown error."));
        }
    }
}

function* handleGetArticleDetail(action: ReturnType<typeof getEditorArticleDetailRequest>) {
    try {
        const response = yield call(callEditorApi, Method.Get, `${ARTICLE_URL}${action.payload.articleId}/${action.payload.version}`, yield getAuthToken());

        if (response.error) {
            console.error("There was error with get article detail: " + response.error);
            yield put(getEditorArticlesError(response.error));
        } else {
            yield put(getEditorArticlesSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with get article detail: " + error.stack!);
            yield put(getEditorArticlesError(error.name));
        } else {
            yield put(getEditorArticlesError("There was an unknown error."));
        }
    }
}

function* handleGetReviewers() {
    try {
        const response = yield call(callEditorApi, Method.Get, `${REVIEWERS_URL}`, yield getAuthToken());

        if (response.error) {
            console.error("There was error with get reviewers: " + response.error);
            yield put(getReviewersError(response.error));
        } else {
            yield put(getReviewersSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with get reviewers: " + error.stack!);
            yield put(getReviewersError(error.name));
        } else {
            yield put(getReviewersError("There was an unknown error."));
        }
    }
}

function* handleSetReviewerToArticle(action: ReturnType<typeof setReviewerToArticleRequest>) {
    try {
        const response = yield call(callEditorApi, Method.Post, reviewEndpoint(action.payload.articleId, action.payload.version), yield getAuthToken(), action.payload.data);

        if (response.error) {
            console.error("There was error with set reviewer to article: " + response.error);
            yield put(setReviewerToArticleError(response.error));
        } else {
            yield put(setReviewerToArticleSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with set reviewer to article: " + error.stack!);
            yield put(setReviewerToArticleError(error.name));
        } else {
            yield put(setReviewerToArticleError("There was an unknown error."));
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

// merge

function* editorSaga() {
    yield all([
        fork(watchGetArticlesRequest),
        fork(watchGetArticleDetailRequest),
        fork(watchHandleReviewersRequest),
        fork(watchHandleSetReviewerToArticle),
    ]);
}

export default editorSaga;
