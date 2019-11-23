import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { getArticlesError, getArticlesSuccess, updateArticleRequest, updateArticleError, updateArticleSuccess } from "store/author/actions";
import { callAuthorApi, callAuthorApiMultipart, getAuthToken, Method } from "utils/api";
import { createArticleError, createArticleRequest, createArticleSuccess, getArticleDetailError, getArticleDetailRequest, getArticleDetailSuccess } from "./actions";
import { ARTICLE_URL, AuthorAction, GET_ARTICLES_URL } from "./types";

function* handleGetArticles() {
    try {
        const response = yield call(callAuthorApi, Method.Get, GET_ARTICLES_URL, yield getAuthToken());

        if (response.error) {
            console.error("There was error with get all articles: " + response.error);
            yield put(getArticlesError(response.error));
        } else {
            yield put(getArticlesSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with get all articles: " + error.stack!);
            yield put(getArticlesError(error.name));
        } else {
            yield put(getArticlesError("There was an unknown error."));
        }
    }
}

function* handleCreateArticle(action: ReturnType<typeof createArticleRequest>) {
    try {
        const response = yield call(callAuthorApiMultipart, Method.Post, ARTICLE_URL,
            yield getAuthToken(), action.payload);

        if (response.error) {
            console.error("There was error with create article: " + response.error);
            yield put(createArticleError(response.error));
        } else {
            yield put(createArticleSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with create article: " + error.stack!);
            yield put(createArticleError(error.name));
        } else {
            yield put(createArticleError("There was an unknown error."));
        }
    }
}

function* handleUpdateArticle(action: ReturnType<typeof updateArticleRequest>) {
    try {
        const response = yield call(callAuthorApiMultipart, Method.Post, ARTICLE_URL,
            yield getAuthToken(), action.payload);

        if (response.error) {
            console.error("There was error with update article: " + response.error);
            yield put(updateArticleError(response.error));
        } else {
            yield put(updateArticleSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with update article: " + error.stack!);
            yield put(updateArticleError(error.name));
        } else {
            yield put(updateArticleError("There was an unknown error."));
        }
    }
}

function* handleGetArticleDetail(action: ReturnType<typeof getArticleDetailRequest>) {
    try {
        const response = yield call(callAuthorApi, Method.Get, `${ARTICLE_URL}${action.payload.articleId}/${action.payload.version}`, yield getAuthToken());

        if (response.error) {
            console.error("There was error with get article detail: " + response.error);
            yield put(getArticleDetailError(response.error));
        } else {
            yield put(getArticleDetailSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with get article detail: " + error.stack!);
            yield put(getArticleDetailError(error.name));
        } else {
            yield put(getArticleDetailError("There was an unknown error."));
        }
    }
}

function* watchGetArticlesRequest() {
    yield takeLatest(AuthorAction.GET_ARTICLES, handleGetArticles);
}

function* watchCreateArticleRequest() {
    yield takeLatest(AuthorAction.CREATE_ARTICLE, handleCreateArticle);
}

function* watchUpdateArticleRequest() {
    yield takeLatest(AuthorAction.UPDATE_ARTICLE, handleUpdateArticle);
}

function* watchGetArticleDetailRequest() {
    yield takeLatest(AuthorAction.GET_ARTICLE_DETAIL, handleGetArticleDetail);
}

function* authorSaga() {
    yield all([
        fork(watchGetArticlesRequest),
        fork(watchCreateArticleRequest),
        fork(watchUpdateArticleRequest),
        fork(watchGetArticleDetailRequest),
    ]);
}

export default authorSaga;
