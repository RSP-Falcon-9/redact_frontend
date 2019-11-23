import { Reducer } from "redux";
import { EditorAction, GetEditorArticleDetailResponse, GetEditorArticleDetailState, GetEditorArticlesState, GetEditorArticlesResponse } from "./types";

const initialGetArticlesState: GetEditorArticlesState = {
    loading: false,
    message: "",
    errors: undefined,
    articles: [],
};

export const getAuthorArticlesStateReducer: Reducer<GetEditorArticlesState> = (state = initialGetArticlesState, action) => {
    switch (action.type) {
        case EditorAction.GET_ARTICLES: {
            return { ...state, loading: true, errors: undefined };
        }
        case EditorAction.GET_ARTICLES_SUCCESS: {
            const getAuthorArticlesResponse = action.payload as GetEditorArticlesResponse;

            return { ...state, loading: false, message: action.payload.message, errors: undefined, articles: getAuthorArticlesResponse.articles };
        }
        case EditorAction.GET_ARTICLES_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};

const initialGetArticleDetailState: GetEditorArticleDetailState = {
    loading: false,
    message: "",
    errors: undefined,
    name: "",
};

export const getAuthorArticleDetailStateReducer: Reducer<GetEditorArticleDetailState> = (state = initialGetArticleDetailState, action) => {
    switch (action.type) {
        case EditorAction.GET_ARTICLE_DETAIL: {
            return { ...state, loading: true, errors: undefined };
        }
        case EditorAction.GET_ARTICLE_DETAIL_SUCCESS: {
            const detailResponse = action.payload as GetEditorArticleDetailResponse;

            return { ...state, loading: false, message: action.payload.message, errors: undefined, name: detailResponse.name };
        }
        case EditorAction.GET_ARTICLE_DETAIL_ERROR: {
            return { ...state, loading: false, message: action.payload.message, errors: action.payload.error };
        }
        default: {
            return state;
        }
    }
};
