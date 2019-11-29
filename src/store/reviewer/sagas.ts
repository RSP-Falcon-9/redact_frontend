import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { getAuthToken, Method, callReviewerApi } from "requests/api";
import { getReviewerArticlesError, getReviewerArticlesSuccess, getReviewerArticleDetailRequest, getReviewerArticleDetailError, getReviewerArticleDetailSuccess, reviewArticleError, reviewArticleSuccess, reviewArticleRequest } from "./actions";
import { ARTICLE_URL, GET_ARTICLES_URL, ReviewerAction, reviewEndpoint } from "./types";

function* handleGetArticles() {
    try {
        const response = yield call(callReviewerApi, Method.Get, GET_ARTICLES_URL, yield getAuthToken());

        if (response.error) {
            console.error("There was error with get all articles: " + response.error);
            yield put(getReviewerArticlesError(response.error));
        } else {
            yield put(getReviewerArticlesSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with get all articles: " + error.stack!);
            yield put(getReviewerArticlesError(error.name));
        } else {
            yield put(getReviewerArticlesError("There was an unknown error."));
        }
    }
}

function* handleGetArticleDetail(action: ReturnType<typeof getReviewerArticleDetailRequest>) {
    try {
        const response = yield call(callReviewerApi, Method.Get, `${ARTICLE_URL}${action.payload.articleId}/${action.payload.version}`, yield getAuthToken());

        if (response.error) {
            console.error("There was error with get article detail: " + response.error);
            yield put(getReviewerArticleDetailError(response.error));
        } else {
            yield put(getReviewerArticleDetailSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with get article detail: " + error.stack!);
            yield put(getReviewerArticleDetailError(error.name));
        } else {
            yield put(getReviewerArticleDetailError("There was an unknown error."));
        }
    }
}

function* handleReviewArticle(action: ReturnType<typeof reviewArticleRequest>) {
    try {
        const response = yield call(callReviewerApi, Method.Post, reviewEndpoint(action.payload.id), yield getAuthToken(), action.payload.data);

        if (response.error) {
            console.error("There was error with review: " + response.error);
            yield put(reviewArticleError(response.error));
        } else {
            yield put(reviewArticleSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with review: " + error.stack!);
            yield put(reviewArticleError({ error: error.name, message: error.message }));
        } else {
            yield put(reviewArticleError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

// watchers

function* watchGetArticlesRequest() {
    yield takeLatest(ReviewerAction.GET_ARTICLES, handleGetArticles);
}

function* watchGetArticleDetailRequest() {
    yield takeLatest(ReviewerAction.GET_ARTICLE_DETAIL, handleGetArticleDetail);
}

function* watchReviewArticleRequest() {
    yield takeLatest(ReviewerAction.REVIEW_ARTICLE, handleReviewArticle);
}

// merge

function* reviewerSaga() {
    yield all([
        fork(watchGetArticlesRequest),
        fork(watchGetArticleDetailRequest),
        fork(watchReviewArticleRequest),
    ]);
}

export default reviewerSaga;
