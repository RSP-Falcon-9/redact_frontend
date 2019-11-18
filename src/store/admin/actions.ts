import { AdminAction, GetAllUsersResponse, CreateUserRequest, User } from "store/admin/types";
import { action } from "typesafe-actions";

export const getAllUsersRequest = () => action(AdminAction.GET_ALL_USERS);
export const getAllUsersSuccess = (data: GetAllUsersResponse) => action(AdminAction.GET_ALL_USERS_SUCCESS, data);
export const getAllUsersError = (message: string) => action(AdminAction.GET_ALL_USERS_ERROR, message);

export const createUserRequest = (userName: string, data: CreateUserRequest) => action(AdminAction.CREATE_USER, {userName, data});
export const createUserSuccess = (user: User) => action(AdminAction.CREATE_USER_SUCCESS, user);
export const createUserError = (message: string) => action(AdminAction.CREATE_USER_ERROR, message);

export const deleteUserRequest = (userName: string) => action(AdminAction.DELETE_USER, userName);
export const deleteUserSuccess = (userName: string) => action(AdminAction.DELETE_USER_SUCCESS, userName);
export const deleteUserError = (message: string) => action(AdminAction.DELETE_USER_ERROR, message);
