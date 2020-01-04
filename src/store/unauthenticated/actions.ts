import { ErrorBaseResponse } from "requests/base-response";
import { action } from "typesafe-actions";
import { GetArchivesResponse, UnauthenticatedAction } from "./types";

export const getArchivesRequest = () => action(UnauthenticatedAction.GET_ARCHIVES);
export const getArchivesSuccess = (response: GetArchivesResponse) => action(UnauthenticatedAction.GET_ARCHIVES_SUCCESS, response);
export const getArchivesError = (errorResponse: ErrorBaseResponse) => action(UnauthenticatedAction.GET_ARCHIVES_ERROR, errorResponse);
