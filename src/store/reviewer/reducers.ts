import { Reducer } from "redux";
import { GetReviewerArticleDetailResponse, GetReviewerArticleDetailState, GetReviewerArticlesResponse, GetReviewerArticlesState, ReviewerAction } from "./types";

const initialGetReviewerArticlesState: GetReviewerArticlesState = {
    loading: false,
    message: "",
    errors: undefined,
    articles: [],
};

export const getReviewerArticlesStateReducer: Reducer<GetReviewerArticlesState> = (state = initialGetReviewerArticlesState, action) => {
    switch (action.type) {
        case ReviewerAction.GET_ARTICLES: {
            return { ...state, loading: true, errors: undefined };
        }
        case ReviewerAction.GET_ARTICLES_SUCCESS: {
            const articlesResponse = action.payload as GetReviewerArticlesResponse;

            return { ...state, loading: false, message: action.payload.message, errors: undefined, articles: articlesResponse.articles };
        }
        case ReviewerAction.GET_ARTICLES_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};

const initialGetReviewerArticleDetailState: GetReviewerArticleDetailState = {
    loading: false,
    message: "",
    errors: undefined,
    name: "",
};

export const getReviewerArticleDetailStateReducer: Reducer<GetReviewerArticleDetailState> = (state = initialGetReviewerArticleDetailState, action) => {
    switch (action.type) {
        case ReviewerAction.GET_ARTICLE_DETAIL: {
            return { ...state, loading: true, errors: undefined };
        }
        case ReviewerAction.GET_ARTICLE_DETAIL_SUCCESS: {
            const detailResponse = action.payload as GetReviewerArticleDetailResponse;

            return { ...state, loading: false, message: action.payload.message, errors: undefined, name: detailResponse.name };
        }
        case ReviewerAction.GET_ARTICLE_DETAIL_ERROR: {
            return { ...state, loading: false, message: action.payload.message, errors: action.payload.error };
        }
        default: {
            return state;
        }
    }
};
