import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { getAuthToken, Method, callReviewerApi } from "utils/api";
import { getReviewerArticlesError, getReviewerArticlesSuccess, getReviewerArticleDetailRequest, getReviewerArticleDetailError, getReviewerArticleDetailSuccess } from "./actions";
import { ARTICLE_URL, GET_ARTICLES_URL, ReviewerAction } from "./types";

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

function* watchGetArticlesRequest() {
    yield takeLatest(ReviewerAction.GET_ARTICLES, handleGetArticles);
}

function* watchGetArticleDetailRequest() {
    yield takeLatest(ReviewerAction.GET_ARTICLE_DETAIL, handleGetArticleDetail);
}

function* reviewerSaga() {
    yield all([
        fork(watchGetArticlesRequest),
        fork(watchGetArticleDetailRequest),
    ]);
}

export default reviewerSaga;
