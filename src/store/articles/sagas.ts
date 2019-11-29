import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { getArticleFileError, getArticleFileRequest, getArticleFileSuccess } from "store/articles/actions";
import { ArticleAction } from "store/articles/types";
import { callArticleApiBlob, getAuthToken, Method } from "requests/api";

function* handleGetArticleFile(action: ReturnType<typeof getArticleFileRequest>) {
    try {
        const response = yield call(callArticleApiBlob, Method.Get, `/${action.payload.articleId}/${action.payload.version}/file`, yield getAuthToken());

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
    yield takeLatest(ArticleAction.GET_ARTICLE_FILE, handleGetArticleFile);
}

function* articleSaga() {
    yield all([
        fork(watchGetArticlesRequest),
    ]);
}

export default articleSaga;
