import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { Method, callChiefEditorApi, getAuthToken } from "requests/api";
import { ChiefEditorActions, createEditionEndpoint, deleteEditionEndpoint, archiveEditionEndpoint } from "./types";
import { createEditionRequest, deleteEditionRequest, createEditionError, createEditionSuccess, deleteEditionError, deleteEditionSuccess, archiveEditionError, archiveEditionSuccess, archiveEditionRequest } from "./actions";

function* handleCreateEdition(action: ReturnType<typeof createEditionRequest>) {
    try {
        const response = yield call(callChiefEditorApi, Method.Post, createEditionEndpoint(),
            yield getAuthToken(), action.payload);

        if (response.error) {
            console.error("There was error with create edition: " + response.error);
            yield put(createEditionError(response.error));
        } else {
            yield put(createEditionSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with create edition: " + error.stack!);
            yield put(createEditionError({ error: error.name, message: error.message }));
        } else {
            yield put(createEditionError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

function* handleDeleteEdition(action: ReturnType<typeof deleteEditionRequest>) {
    try {
        const response = yield call(callChiefEditorApi, Method.Get, deleteEditionEndpoint(action.payload),
            yield getAuthToken());

        if (response.error) {
            console.error("There was error with delete edition: " + response.error);
            yield put(deleteEditionError(response.error));
        } else {
            yield put(deleteEditionSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with delete edition: " + error.stack!);
            yield put(deleteEditionError({ error: error.name, message: error.message }));
        } else {
            yield put(deleteEditionError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

function* handleArchiveEdition(action: ReturnType<typeof archiveEditionRequest>) {
    try {
        const response = yield call(callChiefEditorApi, Method.Get, archiveEditionEndpoint(action.payload),
            yield getAuthToken());

        if (response.error) {
            console.error("There was error with archive edition: " + response.error);
            yield put(archiveEditionError(response.error));
        } else {
            yield put(archiveEditionSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with archive edition: " + error.stack!);
            yield put(archiveEditionError({ error: error.name, message: error.message }));
        } else {
            yield put(archiveEditionError({ error: "There was an unknown error.", message: "" }));
        }
    }
}

// watchers

function* watchCreateEditionRequest() {
    yield takeLatest(ChiefEditorActions.CREATE_EDITION, handleCreateEdition);
}

function* watchDeleteEditionRequest() {
    yield takeLatest(ChiefEditorActions.DELETE_EDITION, handleDeleteEdition);
}

function* watchArchiveEditionRequest() {
    yield takeLatest(ChiefEditorActions.ARCHIVE_EDITION, handleArchiveEdition);
}

// merge

function* chiefEditorSaga() {
    yield all([
        fork(watchCreateEditionRequest),
        fork(watchDeleteEditionRequest),
        fork(watchArchiveEditionRequest),
    ]);
}

export default chiefEditorSaga;
