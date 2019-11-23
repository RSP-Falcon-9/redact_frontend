import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { callAuthorApi, getAuthToken, Method } from "utils/api";
import { getEditorArticleDetailRequest, getEditorArticlesError, getEditorArticlesSuccess } from "./actions";
import { ARTICLE_URL, EditorAction, GET_ARTICLES_URL } from "./types";

function* handleGetArticles() {
    try {
        const response = yield call(callAuthorApi, Method.Get, GET_ARTICLES_URL, yield getAuthToken());

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
        const response = yield call(callAuthorApi, Method.Get, `${ARTICLE_URL}${action.payload.articleId}/${action.payload.version}`, yield getAuthToken());

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

function* watchGetArticlesRequest() {
    yield takeLatest(EditorAction.GET_ARTICLES, handleGetArticles);
}

function* watchGetArticleDetailRequest() {
    yield takeLatest(EditorAction.GET_ARTICLE_DETAIL, handleGetArticleDetail);
}

function* editorSaga() {
    yield all([
        fork(watchGetArticlesRequest),
        fork(watchGetArticleDetailRequest),
    ]);
}

export default editorSaga;
