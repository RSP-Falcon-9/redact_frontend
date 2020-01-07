import { ErrorBaseResponse } from "requests/base-response";
import { action } from "typesafe-actions";
import { GetArchivesResponse, UnauthenticatedAction, GetEditionsResponse } from "./types";

export const getEditionsRequest = () => action(UnauthenticatedAction.GET_EDITIONS);
export const getEditionsSuccess = (response: GetEditionsResponse) => action(UnauthenticatedAction.GET_EDITIONS_SUCCESS, response);
export const getEditionsError = (errorResponse: ErrorBaseResponse) => action(UnauthenticatedAction.GET_EDITIONS_ERROR, errorResponse);

export const getArchivesRequest = () => action(UnauthenticatedAction.GET_ARCHIVES);
export const getArchivesSuccess = (response: GetArchivesResponse) => action(UnauthenticatedAction.GET_ARCHIVES_SUCCESS, response);
export const getArchivesError = (errorResponse: ErrorBaseResponse) => action(UnauthenticatedAction.GET_ARCHIVES_ERROR, errorResponse);
