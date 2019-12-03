import { Reducer } from "redux";
import { ArticleAction, GetArticleFileResponse, GetArticleFileState } from "./types";
import { ErrorBaseResponse } from "requests/base-response";

const initialGetArticleFileState: GetArticleFileState = {
    loading: false,
    message: "",
    error: undefined,
    fileUrl: undefined,
};

export const getArticleFileStateReducer: Reducer<GetArticleFileState> =
    (state = initialGetArticleFileState, action): GetArticleFileState => {
    switch (action.type) {
        case ArticleAction.GET_ARTICLE_FILE: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
            };
        }
        case ArticleAction.GET_ARTICLE_FILE_SUCCESS: {
            const fileResponse = action.payload as GetArticleFileResponse;

            return {
                ...state,
                loading: false,
                message: action.payload.message,
                error: undefined,
                fileUrl: URL.createObjectURL(fileResponse.data),
            };
        }
        case ArticleAction.GET_ARTICLE_FILE_ERROR: {
            const getArticleFileError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: getArticleFileError.message,
                error: getArticleFileError.error,
            };
        }
        default: {
            return state;
        }
    }
};
