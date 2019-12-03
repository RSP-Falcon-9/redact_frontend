import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { callAuthorApi, callAuthorApiMultipart, getAuthToken, Method } from "requests/api";
import {
    getArticlesError,
    getArticlesSuccess,
    updateArticleRequest,
    updateArticleError,
    updateArticleSuccess,
    createArticleError,
    createArticleRequest,
    createArticleSuccess,
    getArticleDetailError,
    getArticleDetailRequest,
    getArticleDetailSuccess,
    appealReviewRequest,
    appealReviewError,
    appealReviewSuccess} from "./actions";
import { ARTICLE_URL, AuthorAction, GET_ARTICLES_URL, authorUpdateArticleEndpoint, authorAppealEndpoint } from "./types";
import { authorArticleDetailEndpoint } from "store/author/types";

function* handleGetArticles() {
    try {
        const response = yield call(callAuthorApi, Method.Get, GET_ARTICLES_URL, yield getAuthToken());

        if (response.error) {
            console.error(`There was error with get all articles: ${response.error}`);
            yield put(getArticlesError(response));
        } else {
            yield put(getArticlesSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`There was error with get all articles: ${error.stack!}`);
            yield put(getArticlesError({ error: error.name, message: error.message }));
        } else {
            yield put(getArticlesError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

function* handleCreateArticle(action: ReturnType<typeof createArticleRequest>) {
    try {
        const response = yield call(callAuthorApiMultipart, Method.Post, ARTICLE_URL,
            yield getAuthToken(), action.payload);

        if (response.error) {
            console.error(`There was error with create article: ${response.error}`);
            yield put(createArticleError(response));
        } else {
            yield put(createArticleSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`There was error with create article: ${error.stack!}`);
            yield put(createArticleError({ error: error.name, message: error.message }));
        } else {
            yield put(createArticleError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

function* handleUpdateArticle(action: ReturnType<typeof updateArticleRequest>) {
    try {
        const response = yield call(callAuthorApiMultipart, Method.Post,
            authorUpdateArticleEndpoint(action.payload.id),
            yield getAuthToken(), action.payload);

        if (response.error) {
            console.error(`There was error with update article: ${response.error}`);
            yield put(updateArticleError(response.error));
        } else {
            yield put(updateArticleSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`There was error with update article: ${error.stack!}`);
            yield put(updateArticleError({ error: error.name, message: error.message }));
        } else {
            yield put(updateArticleError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

function* handleGetArticleDetail(action: ReturnType<typeof getArticleDetailRequest>) {
    try {
        const response = yield call(callAuthorApi, Method.Get,
            authorArticleDetailEndpoint(action.payload.articleId, action.payload.version),
            yield getAuthToken());

        if (response.error) {
            console.error(`There was error with get article detail: ${response.error}`);
            yield put(getArticleDetailError(response));
        } else {
            yield put(getArticleDetailSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`There was error with get article detail: ${error.stack!}`);
            yield put(getArticleDetailError({ error: error.name, message: error.message }));
        } else {
            yield put(getArticleDetailError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

function* handleAppealReview(action: ReturnType<typeof appealReviewRequest>) {
    try {
        const response = yield call(callAuthorApi, Method.Get,
            authorAppealEndpoint(action.payload.reviewId),
            yield getAuthToken(), action.payload.request);

        if (response.error) {
            console.error(`There was error with appeal review detail: ${response.error}`);
            yield put(appealReviewError(response));
        } else {
            yield put(appealReviewSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`There was error with appeal review detail: ${error.stack!}`);
            yield put(appealReviewError({ error: error.name, message: error.message }));
        } else {
            yield put(appealReviewError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

// watchers

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

function* watchAppealReviewRequest() {
    yield takeLatest(AuthorAction.APPEAL_REVIEW, handleAppealReview);
}

// merge

function* authorSaga() {
    yield all([
        fork(watchGetArticlesRequest),
        fork(watchCreateArticleRequest),
        fork(watchUpdateArticleRequest),
        fork(watchGetArticleDetailRequest),
        fork(watchAppealReviewRequest),
    ]);
}

export default authorSaga;
