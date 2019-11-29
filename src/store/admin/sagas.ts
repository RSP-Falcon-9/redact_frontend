import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { createUserError, createUserRequest, createUserSuccess, deleteUserError, deleteUserRequest, deleteUserSuccess, getAllUsersError, getAllUsersSuccess } from "store/admin/actions";
import { AdminAction, GET_ALL_USERS_URL, USER_URL } from "store/admin/types";
import { callAdminApi, getAuthToken, Method } from "requests/api";

function* handleGetAllUsers() {
    try {
        const response = yield call(callAdminApi, Method.Get, GET_ALL_USERS_URL, yield getAuthToken());

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

function* handleCreateUser(action: ReturnType<typeof createUserRequest>) {
    try {
        const response = yield call(callAdminApi, Method.Post, USER_URL + action.payload.userName, yield getAuthToken(), action.payload.data);

        if (response.error) {
            console.error("There was error with create user: " + response.error);
            yield put(createUserError(response.error));
        } else {
            yield put(createUserSuccess({
                userName: action.payload.userName,
                roles: action.payload.data.roles,
            }));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with create user: " + error.stack!);
            yield put(createUserError(error.name));
        } else {
            yield put(createUserError("There was an unknown error."));
        }
    }
}

function* handleDeleteUser(action: ReturnType<typeof deleteUserRequest>) {
    try {
        const response = yield call(callAdminApi, Method.Delete, USER_URL + action.payload, yield getAuthToken());

        if (response.error) {
            console.error("There was error with delete user: " + response.error);
            yield put(deleteUserError(response.error));
        } else {
            yield put(deleteUserSuccess(action.payload));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("There was error with delete user: " + error.stack!);
            yield put(deleteUserError(error.name));
        } else {
            yield put(deleteUserError("There was an unknown error."));
        }
    }
}

function* watchGetAllUsersRequest() {
    yield takeLatest(AdminAction.GET_ALL_USERS, handleGetAllUsers);
}

function* watchCreateUserRequest() {
    yield takeLatest(AdminAction.CREATE_USER, handleCreateUser);
}

function* watchDeleteUserRequest() {
    yield takeLatest(AdminAction.DELETE_USER, handleDeleteUser);
}

function* adminSaga() {
    yield all([
        fork(watchGetAllUsersRequest),
        fork(watchCreateUserRequest),
        fork(watchDeleteUserRequest),
    ]);
}

export default adminSaga;
