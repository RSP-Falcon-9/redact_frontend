import { Reducer } from "redux";
import { ErrorBaseResponse } from "requests/base-response";
import { ArchivesState, GetArchivesResponse, UnauthenticatedAction } from "./types";

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
