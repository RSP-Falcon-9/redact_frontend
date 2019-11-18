import { Reducer } from "redux";
import { GetAllUsersState, AdminAction, GetAllUsersResponse, CreateUserState, User } from "store/admin/types";

const initialGetAllUsersState: GetAllUsersState = {
    loading: false,
    users: [],
    errors: undefined,
};

export const getAllUsersReducer: Reducer<GetAllUsersState> = (state = initialGetAllUsersState, action) => {
    switch (action.type) {
        case AdminAction.GET_ALL_USERS: {
            return { ...state, loading: true, errors: undefined };
        }
        case AdminAction.GET_ALL_USERS_SUCCESS: {
            const getAllUsersResponse = action.payload as GetAllUsersResponse;

            return { ...state, loading: false, users: getAllUsersResponse.users, errors: undefined };
        }
        case AdminAction.CREATE_USER_SUCCESS: {
            const user = action.payload as User;

            return { ...state, loading: false, users: [...state.users, user], errors: undefined };
        }
        case AdminAction.DELETE_USER_SUCCESS: {
            const deletedUserName = action.payload as string;
            const newUsers = [...state.users].filter(user => user.userName !== deletedUserName);

            return { ...state, loading: false, users: newUsers, errors: undefined };
        }
        case AdminAction.GET_ALL_USERS_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};

const initialCreateUserState: CreateUserState = {
    loading: false,
    errors: undefined,
};

export const createUserReducer: Reducer<CreateUserState> = (state = initialCreateUserState, action) => {
    switch (action.type) {
        case AdminAction.CREATE_USER: {
            return { ...state, loading: true, errors: undefined };
        }
        case AdminAction.CREATE_USER_SUCCESS: {
            return { ...state, loading: false, errors: undefined };
        }
        case AdminAction.CREATE_USER_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};

const initialDeleteUserState: CreateUserState = {
    loading: false,
    errors: undefined,
};

export const deleteUserReducer: Reducer<CreateUserState> = (state = initialDeleteUserState, action) => {
    switch (action.type) {
        case AdminAction.DELETE_USER: {
            return { ...state, loading: true, errors: undefined };
        }
        case AdminAction.DELETE_USER_SUCCESS: {
            return { ...state, loading: false, errors: undefined };
        }
        case AdminAction.DELETE_USER_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};
