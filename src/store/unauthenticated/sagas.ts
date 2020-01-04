import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { callUnauthenticatedApi, Method } from "requests/api";
import { getArchivesError, getArchivesSuccess } from "./actions";
import { getArchivesEndpoint, UnauthenticatedAction } from "./types";

function* handleGetArchives() {
    try {
        const response = yield call(callUnauthenticatedApi, Method.Post, getArchivesEndpoint());

        if (response.error) {
            console.error("There was error with get archives: " + response.error);
            yield put(getArchivesError(response.error));
        } else {
            yield put(getArchivesSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with get archives: " + error.stack!);
            yield put(getArchivesError({ error: error.name, message: error.message }));
        } else {
            yield put(getArchivesError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

// watchers

function* watchGetArchivesRequest() {
    yield takeLatest(UnauthenticatedAction.GET_ARCHIVES, handleGetArchives);
}

// merge

function* unauthenticatedSaga() {
    yield all([
        fork(watchGetArchivesRequest),
    ]);
}

export default unauthenticatedSaga;
