import { Reducer } from "redux";
import { ErrorBaseResponse } from "requests/base-response";
import { ChiefEditorActions, CreateEditionState, DeleteEditionState, ArchiveEditionState, ArchiveEditionResponse, DeleteEditionResponse, CreateEditionResponse } from "./types";

const initialCreateEditionState: CreateEditionState = {
    loading: false,
    message: "",
    error: undefined,
};

export const createEditionStateReducer: Reducer<CreateEditionState> =
    (state = initialCreateEditionState, action): CreateEditionState => {
    switch (action.type) {
        case ChiefEditorActions.CREATE_EDITION: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
            };
        }
        case ChiefEditorActions.CREATE_EDITION_SUCCESS: {
            const createEditionSuccess = action.payload as CreateEditionResponse;

            return {
                ...state,
                loading: false,
                message: createEditionSuccess.message,
                error: undefined,
            };
        }
        case ChiefEditorActions.CREATE_EDITION_ERROR: {
            const createEditionError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: createEditionError.message,
                error: createEditionError.error,
            };
        }
        default: {
            return state;
        }
    }
};

const initialDeleteEditionState: DeleteEditionState = {
    loading: false,
    message: "",
    error: undefined,
};

export const deleteEditionStateReducer: Reducer<DeleteEditionState> =
    (state = initialDeleteEditionState, action): DeleteEditionState => {
    switch (action.type) {
        case ChiefEditorActions.DELETE_EDITION: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
            };
        }
        case ChiefEditorActions.DELETE_EDITION_SUCCESS: {
            const deleteEditionSuccess = action.payload as DeleteEditionResponse;

            return {
                ...state,
                loading: false,
                message: deleteEditionSuccess.message,
                error: undefined,
            };
        }
        case ChiefEditorActions.DELETE_EDITION_ERROR: {
            const deleteEditionError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: deleteEditionError.message,
                error: deleteEditionError.error,
            };
        }
        default: {
            return state;
        }
    }
};

const initialArchiveEditionState: ArchiveEditionState = {
    loading: false,
    message: "",
    error: undefined,
};

export const archiveEditionStateReducer: Reducer<ArchiveEditionState> =
    (state = initialArchiveEditionState, action): ArchiveEditionState => {
    switch (action.type) {
        case ChiefEditorActions.ARCHIVE_EDITION: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
            };
        }
        case ChiefEditorActions.ARCHIVE_EDITION_SUCCESS: {
            const archiveEditionSuccess = action.payload as ArchiveEditionResponse;

            return {
                ...state,
                loading: false,
                message: archiveEditionSuccess.message,
                error: undefined,
            };
        }
        case ChiefEditorActions.ARCHIVE_EDITION_ERROR: {
            const archiveEditionError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: archiveEditionError.message,
                error: archiveEditionError.error,
            };
        }
        default: {
            return state;
        }
    }
};
