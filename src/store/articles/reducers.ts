import { Reducer } from "redux";
import { ArticleAction, GetArticleFileResponse, GetArticleFileState } from "./types";

const initialGetArticleFileState: GetArticleFileState = {
    loading: false,
    message: "",
    errors: undefined,
    fileUrl: undefined,
};

export const getArticleFileStateReducer: Reducer<GetArticleFileState> = (state = initialGetArticleFileState, action) => {
    switch (action.type) {
        case ArticleAction.GET_ARTICLE_FILE: {
            return { ...state, loading: true, errors: undefined };
        }
        case ArticleAction.GET_ARTICLE_FILE_SUCCESS: {
            const fileResponse = action.payload as GetArticleFileResponse;

            return { ...state, loading: false, message: action.payload.message, errors: undefined, fileUrl: URL.createObjectURL(fileResponse.data) };
        }
        case ArticleAction.GET_ARTICLE_FILE_ERROR: {
            return { ...state, loading: false, message: action.payload.message, errors: action.payload.error };
        }
        default: {
            return state;
        }
    }
};
