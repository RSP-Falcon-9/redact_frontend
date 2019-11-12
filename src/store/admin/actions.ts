import { AdminAction, GetAllUsersResponse } from "store/admin/types";
import { action } from "typesafe-actions";

export const getAllUsersRequest = () => action(AdminAction.GET_ALL_USERS);
export const getAllUsersSuccess = (data: GetAllUsersResponse) => action(AdminAction.GET_ALL_USERS_SUCCESS, data);
export const getAllUsersError = (message: string) => action(AdminAction.GET_ALL_USERS_ERROR, message);
