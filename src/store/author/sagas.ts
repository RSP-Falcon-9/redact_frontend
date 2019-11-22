import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { getArticlesError, getArticlesSuccess } from "store/articles/actions";
import { callAuthorApi, getAuthToken, Method, callAuthorApiMultipart, callAuthorApiBlob } from "utils/api";
import { createArticleError, createArticleSuccess, getArticleDetailRequest, createArticleRequest, getArticleDetailError, getArticleDetailSuccess, getArticleFileSuccess, getArticleFileError, getArticleFileRequest } from "./actions";
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

function* handleGetArticleFile(action: ReturnType<typeof getArticleFileRequest>) {
    try {
        const response = yield call(callAuthorApiBlob, Method.Get, `${ARTICLE_URL}${action.payload.articleId}/${action.payload.version}/file`, yield getAuthToken());

        if (response.error) {
            console.error("There was error with get article file: " + response.error);
            yield put(getArticleFileError(response.error));
        } else {
            yield put(getArticleFileSuccess({data: response}));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with get article file: " + error.stack!);
            yield put(getArticleFileError(error.name));
        } else {
            yield put(getArticleFileError("There was an unknown error."));
        }
    }
}

function* watchGetArticlesRequest() {
    yield takeLatest(AuthorAction.GET_ARTICLES, handleGetArticles);
}

function* watchCreateArticleRequest() {
    yield takeLatest(AuthorAction.CREATE_ARTICLE, handleCreateArticle);
}

function* watchGetArticleDetailRequest() {
    yield takeLatest(AuthorAction.GET_ARTICLE_DETAIL, handleGetArticleDetail);
}

function* watchGetArticleFileRequest() {
    yield takeLatest(AuthorAction.GET_ARTICLE_FILE, handleGetArticleFile);
}

function* authorSaga() {
    yield all([
        fork(watchGetArticlesRequest),
        fork(watchCreateArticleRequest),
        fork(watchGetArticleDetailRequest),
        fork(watchGetArticleFileRequest),
    ]);
}

export default authorSaga;
