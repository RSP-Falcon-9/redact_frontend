import { Reducer } from "redux";
import { ErrorBaseResponse } from "requests/base-response";
import { ArchivesState, GetArchivesResponse, UnauthenticatedAction, GetEditionsResponse } from "./types";
import { ChiefEditorActions, GetEditionsState, CreateEditionResponse, DeleteEditionResponse, ArchiveEditionResponse } from "store/chiefeditor/types";

const initialGetEditionsState: GetEditionsState = {
    loading: false,
    message: "",
    error: undefined,
    editions: [],
};

export const getEditionsStateReducer: Reducer<GetEditionsState> =
    (state = initialGetEditionsState, action): GetEditionsState => {
    switch (action.type) {
        case UnauthenticatedAction.GET_EDITIONS: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
                editions: [],
            };
        }
        case UnauthenticatedAction.GET_EDITIONS_SUCCESS: {
            const getArchivesSuccess = action.payload as GetEditionsResponse;

            return {
                ...state,
                loading: false,
                message: getArchivesSuccess.message,
                error: undefined,
                editions: getArchivesSuccess.editions,
            };
        }
        case UnauthenticatedAction.GET_EDITIONS_ERROR: {
            const reviewArticleError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: reviewArticleError.message,
                error: reviewArticleError.error,
            };
        }
        case ChiefEditorActions.CREATE_EDITION_SUCCESS: {
            const createEditionSuccess = action.payload as CreateEditionResponse;

            return { ...state, editions: [ ...state.editions, createEditionSuccess.edition ] };
        }
        case ChiefEditorActions.DELETE_EDITION_SUCCESS: {
            const deleteEditionSuccess = action.payload as DeleteEditionResponse;

            return { ...state, editions: state.editions.filter(edition => edition.id !== deleteEditionSuccess.editionId) };
        }
        case ChiefEditorActions.ARCHIVE_EDITION_SUCCESS: {
            const archiveEditionSuccess = action.payload as ArchiveEditionResponse;
            const newEditions = state.editions.map(edition => {
                if (edition.id === archiveEditionSuccess.editionId) {
                    return { ...edition, archived: true };
                }

                return edition;
            });

            return { ...state, editions: newEditions };
        }
        default: {
            return state;
        }
    }
};

const initialArchivesState: ArchivesState = {
    loading: false,
    message: "",
    error: undefined,
    archives: [],
};

export const getArchivesStateReducer: Reducer<ArchivesState> =
    (state = initialArchivesState, action): ArchivesState => {
    switch (action.type) {
        case UnauthenticatedAction.GET_ARCHIVES: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
                archives: [],
            };
        }
        case UnauthenticatedAction.GET_ARCHIVES_SUCCESS: {
            const getArchivesSuccess = action.payload as GetArchivesResponse;

            return {
                ...state,
                loading: false,
                message: getArchivesSuccess.message,
                error: undefined,
                archives: getArchivesSuccess.archives,
            };
        }
        case UnauthenticatedAction.GET_ARCHIVES_ERROR: {
            const getArchivesError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: getArchivesError.message,
                error: getArchivesError.error,
            };
        }
        default: {
            return state;
        }
    }
};
