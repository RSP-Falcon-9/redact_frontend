export enum AdminAction {
    GET_ALL_USERS = "@@admin/getAllUsers",
    GET_ALL_USERS_SUCCESS = "@@admin/getAllUsersSuccess",
    GET_ALL_USERS_ERROR = "@@admin/getAllUsersError",
}

export interface GetAllUsersResponse {
    users: User[];
}

export interface User {
    userName: string;
}

export interface AdminState {
    readonly loading: boolean;
    readonly users: User[];
    readonly errors?: string;
}

export const GET_ALL_USERS_URL = "/users";
