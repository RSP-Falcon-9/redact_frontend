import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { getArticlesError, getArticlesSuccess } from "store/articles/actions";
import { ArticleAction, GET_ARTICLES_URL } from "store/articles/types";
import { callAuthorApi, getAuthToken, Method } from "utils/api";

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

function* watchGetArticlesRequest() {
    yield takeLatest(ArticleAction.GET_AUTHOR_ARTICLES, handleGetArticles);
}

function* articleSaga() {
    yield all([
        fork(watchGetArticlesRequest),
    ]);
}

export default articleSaga;
