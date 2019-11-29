import { Reducer } from "redux";
import { GetReviewerArticleDetailResponse,
    GetReviewerArticleDetailState,
    GetReviewerArticlesResponse,
    GetReviewerArticlesState,
    ReviewerAction,
    ArticleReviewStatus,
    ReviewArticleState } from "./types";

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
    error: undefined,
    name: "",
    id: "",
    reviewStatus: ArticleReviewStatus.NEW,
    interest: -1,
    originality: -1,
    specializationLevel: -1,
    languageLevel: -1,
    comment: "",
    reviewDate: new Date(),
};

export const getReviewerArticleDetailStateReducer: Reducer<GetReviewerArticleDetailState> = (state = initialGetReviewerArticleDetailState, action) => {
    switch (action.type) {
        case ReviewerAction.GET_ARTICLE_DETAIL: {
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        }
        case ReviewerAction.GET_ARTICLE_DETAIL_SUCCESS: {
            const detailResponse = action.payload as GetReviewerArticleDetailResponse;

            return {
                ...state,
                loading: false,
                message: action.payload.message,
                error: undefined,
                name: detailResponse.name,
                id: detailResponse.reviewId,
                reviewStatus: Object.values(ArticleReviewStatus).indexOf(detailResponse.reviewStatus),
                interest: detailResponse.interest,
                originality: detailResponse.originality,
                specializationLevel: detailResponse.specializationLevel,
                languageLevel: detailResponse.languageLevel,
                comment: detailResponse.comment,
                reviewDate: detailResponse.reviewDate,
            };
        }
        case ReviewerAction.GET_ARTICLE_DETAIL_ERROR: {
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        }
        default: {
            return state;
        }
    }
};

const initialReviewArticleState: ReviewArticleState = {
    loading: false,
    message: "",
    errors: undefined,
};

export const reviewArticleStateReducer: Reducer<ReviewArticleState> = (state = initialReviewArticleState, action) => {
    switch (action.type) {
        case ReviewerAction.REVIEW_ARTICLE: {
            return { ...state, loading: true, errors: undefined };
        }
        case ReviewerAction.REVIEW_ARTICLE_SUCCESS: {
            return { ...state, loading: false, message: action.payload.message, errors: undefined };
        }
        case ReviewerAction.REVIEW_ARTICLE_ERROR: {
            return { ...state, loading: false, message: action.payload.message, errors: action.payload.error };
        }
        default: {
            return state;
        }
    }
};
