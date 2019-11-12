import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getAllUsersError, getAllUsersSuccess } from "store/admin/actions";
import { AdminAction, GET_ALL_USERS_URL } from "store/admin/types";
import { callApi, getAuthToken } from "utils/api";
import { ADMIN_URL } from "utils/constants";

function* handleGetAllUsers() {
    try {
        const response = yield call(callApi, "get", ADMIN_URL + GET_ALL_USERS_URL, yield getAuthToken());

        if (response.error) {
            console.error("There was error with get all users: " + response.error);
            yield put(getAllUsersError(response.error));
        } else {
            yield put(getAllUsersSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with get all users: " + error.stack!);
            yield put(getAllUsersError(error.name));
        } else {
            yield put(getAllUsersError("There was an unknown error."));
        }
    }
}

function* watchGetAllUsersRequest() {
    yield takeEvery(AdminAction.GET_ALL_USERS, handleGetAllUsers);
}

function* adminSaga() {
    yield all([fork(watchGetAllUsersRequest)]);
}

export default adminSaga;
