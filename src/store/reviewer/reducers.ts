import { Reducer } from "redux";
import { GetReviewerArticleDetailResponse,
    GetReviewerArticleDetailState,
    GetReviewerArticlesResponse,
    GetReviewerArticlesState,
    ReviewerAction,
    ArticleReviewStatus,
    ReviewArticleState } from "./types";
import { ErrorBaseResponse, BaseResponse } from "requests/base-response";

const initialGetReviewerArticlesState: GetReviewerArticlesState = {
    loading: false,
    message: "",
    error: undefined,
    articles: [],
};

export const getReviewerArticlesStateReducer: Reducer<GetReviewerArticlesState> =
    (state = initialGetReviewerArticlesState, action): GetReviewerArticlesState => {
    switch (action.type) {
        case ReviewerAction.GET_ARTICLES: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
            };
        }
        case ReviewerAction.GET_ARTICLES_SUCCESS: {
            const articlesResponse = action.payload as GetReviewerArticlesResponse;

            return {
                ...state,
                loading: false,
                message: articlesResponse.message,
                error: undefined,
                articles: articlesResponse.articles,
            };
        }
        case ReviewerAction.GET_ARTICLES_ERROR: {
            const getArticlesError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: getArticlesError.message,
                error: getArticlesError.error,
            };
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

export const getReviewerArticleDetailStateReducer: Reducer<GetReviewerArticleDetailState> =
    (state = initialGetReviewerArticleDetailState, action): GetReviewerArticleDetailState => {
    switch (action.type) {
        case ReviewerAction.GET_ARTICLE_DETAIL: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
            };
        }
        case ReviewerAction.GET_ARTICLE_DETAIL_SUCCESS: {
            const detailResponse = action.payload as GetReviewerArticleDetailResponse;

            return {
                ...state,
                loading: false,
                message: detailResponse.message,
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
            const getArticleDetailError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: getArticleDetailError.message,
                error: getArticleDetailError.error,
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
    error: undefined,
};

export const reviewArticleStateReducer: Reducer<ReviewArticleState> =
    (state = initialReviewArticleState, action): ReviewArticleState => {
    switch (action.type) {
        case ReviewerAction.REVIEW_ARTICLE: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
            };
        }
        case ReviewerAction.REVIEW_ARTICLE_SUCCESS: {
            const reviewArticleSuccess = action.payload as BaseResponse;

            return {
                ...state,
                loading: false,
                message: reviewArticleSuccess.message,
                error: undefined,
            };
        }
        case ReviewerAction.REVIEW_ARTICLE_ERROR: {
            const reviewArticleError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: reviewArticleError.message,
                error: reviewArticleError.error,
            };
        }
        default: {
            return state;
        }
    }
};
