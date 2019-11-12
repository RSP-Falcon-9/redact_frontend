import { Reducer } from "redux";
import { AdminState, AdminAction, GetAllUsersResponse } from "store/admin/types";

const initialState: AdminState = {
    loading: false,
    users: [],
    errors: undefined,
};

export const adminReducer: Reducer<AdminState> = (state = initialState, action) => {
    switch (action.type) {
        case AdminAction.GET_ALL_USERS: {
            return { ...state, loading: true, errors: undefined };
        }
        case AdminAction.GET_ALL_USERS_SUCCESS: {
            const typedAction = action.payload as GetAllUsersResponse;

            return { ...state, loading: false, users: typedAction.users, errors: undefined };
        }
        case AdminAction.GET_ALL_USERS_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};
