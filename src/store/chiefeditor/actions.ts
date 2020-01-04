import { ErrorBaseResponse } from "requests/base-response";
import { action } from "typesafe-actions";
import {
    ChiefEditorActions,
    GetEditionsResponse,
    CreateEditionRequest,
    CreateEditionResponse,
    DeleteEditionResponse,
    ArchiveEditionResponse } from "./types";

export const getEditionsRequest = () => action(ChiefEditorActions.GET_EDITIONS);
export const getEditionsSuccess = (response: GetEditionsResponse) => action(ChiefEditorActions.GET_EDITIONS_SUCCESS, response);
export const getEditionsError = (errorResponse: ErrorBaseResponse) => action(ChiefEditorActions.GET_EDITIONS_ERROR, errorResponse);

export const createEditionRequest = (request: CreateEditionRequest) => action(ChiefEditorActions.CREATE_EDITION, request);
export const createEditionSuccess = (response: CreateEditionResponse) => action(ChiefEditorActions.CREATE_EDITION_SUCCESS, response);
export const createEditionError = (errorResponse: ErrorBaseResponse) => action(ChiefEditorActions.CREATE_EDITION_ERROR, errorResponse);

export const deleteEditionRequest = (editionId: number) => action(ChiefEditorActions.DELETE_EDITION, editionId);
export const deleteEditionSuccess = (response: DeleteEditionResponse) => action(ChiefEditorActions.DELETE_EDITION_SUCCESS, response);
export const deleteEditionError = (errorResponse: ErrorBaseResponse) => action(ChiefEditorActions.DELETE_EDITION_ERROR, errorResponse);

export const archiveEditionRequest = (editionId: number) => action(ChiefEditorActions.ARCHIVE_EDITION, editionId);
export const archiveEditionSuccess = (response: ArchiveEditionResponse) => action(ChiefEditorActions.ARCHIVE_EDITION_SUCCESS, response);
export const archiveEditionError = (errorResponse: ErrorBaseResponse) => action(ChiefEditorActions.ARCHIVE_EDITION_ERROR, errorResponse);
