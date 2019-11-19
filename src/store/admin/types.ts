export enum AdminAction {
    GET_ALL_USERS = "@@admin/getAllUsers",
    GET_ALL_USERS_SUCCESS = "@@admin/getAllUsersSuccess",
    GET_ALL_USERS_ERROR = "@@admin/getAllUsersError",

    CREATE_USER = "@@admin/createUser",
    CREATE_USER_SUCCESS = "@admin/createUserSuccess",
    CREATE_USER_ERROR = "@admin/createUserError",

    DELETE_USER = "@@admin/deleteUser",
    DELETE_USER_SUCCESS = "@@admin/deleteUserSuccess",
    DELETE_USER_ERROR = "@@admin/deleteUserError",
}

export interface User {
    userName: string;
    roles: string[];
}

export interface GetAllUsersResponse {
    users: User[];
}

export interface CreateUserRequest {
    password: string;
    roles: string[];
}

export interface DeleteUserRequest {
    userName: string;
}

export interface GetAllUsersState {
    readonly loading: boolean;
    readonly errors?: string;
    readonly users: User[];
}

export interface CreateUserState {
    readonly loading: boolean;
    readonly errors?: string;
}

export interface DeleteUserState {
    readonly loading: boolean;
    readonly errors?: string;
}

export interface AdminState {
    readonly getAllUsers: GetAllUsersState;
    readonly createUser: CreateUserState;
    readonly deleteUser: DeleteUserState;
}

export const GET_ALL_USERS_URL = "/users";
export const USER_URL = "/user/";
