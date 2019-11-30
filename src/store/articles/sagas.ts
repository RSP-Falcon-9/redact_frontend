import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { getArticleFileError, getArticleFileRequest, getArticleFileSuccess } from "store/articles/actions";
import { ArticleAction, articleFileEndpoint } from "store/articles/types";
import { callArticleApiBlob, getAuthToken, Method } from "requests/api";

function* handleGetArticleFile(action: ReturnType<typeof getArticleFileRequest>) {
    try {
        const response = yield call(callArticleApiBlob, Method.Get,
            articleFileEndpoint(action.payload.articleId, action.payload.version), yield getAuthToken());

        if (response.error) {
            console.error(`There was error with get article file: ${response.error}`);
            yield put(getArticleFileError(response));
        } else {
            yield put(getArticleFileSuccess({data: response}));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`There was error with get article file: ${error.stack!}`);
            yield put(getArticleFileError({ error: error.name, message: error.message }));
        } else {
            yield put(getArticleFileError({ error: "There was an unknown error.", message: "" }));
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
