import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { callApi } from "utils/api";
import { AUTH_URL } from "utils/constants";
import { authError, authRequest, authSuccess } from "store/auth/actions";
import { AuthAction } from "store/auth/types";

function* handleAuth(action: ReturnType<typeof authRequest>) {
    try {
        const response = yield call(callApi, "post", AUTH_URL, undefined, action.payload);

        if (response.error) {
            console.error("There was error with authentication: " + response.error);
            yield put(authError(response.error));
        } else {
            yield put(authSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with authentication: " + error.stack!);
            yield put(authError(error.name));
        } else {
            yield put(authError("There was an unknown error."));
        }
    }
}

function* watchAuthRequest() {
    yield takeEvery(AuthAction.AUTH_REQUEST, handleAuth);
}

function* authSaga() {
    yield all([fork(watchAuthRequest)]);
}

export default authSaga;
