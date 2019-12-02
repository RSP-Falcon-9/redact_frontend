import { Reducer } from "redux";
import { ArticleReviewStatus } from "store/reviewer/types";
import {
    AuthorAction,
    CreateArticleState,
    GetArticleDetailResponse,
    GetArticleDetailState,
    GetArticlesResponse,
    GetArticlesState,
    UpdateArticleState } from "./types";
import { ErrorBaseResponse, BaseResponse } from "requests/base-response";

const initialGetArticlesState: GetArticlesState = {
    loading: false,
    message: "",
    error: undefined,
    articles: [],
};

export const getAuthorArticlesStateReducer: Reducer<GetArticlesState> =
    (state = initialGetArticlesState, action): GetArticlesState => {
    switch (action.type) {
        case AuthorAction.GET_ARTICLES: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
            };
        }
        case AuthorAction.GET_ARTICLES_SUCCESS: {
            const getAuthorArticlesResponse = action.payload as GetArticlesResponse;

            const articlesMap = getAuthorArticlesResponse.articles.map(article => {
                return {
                    ...article,
                    versions: article.versions.map(version => {
                        return {
                            ...version,
                            status: Object.values(ArticleReviewStatus).indexOf(version.status),
                        };
                    }),
                };
            });

            return {
                ...state,
                loading: false,
                message: getAuthorArticlesResponse.message,
                error: undefined,
                articles: articlesMap,
            };
        }
        case AuthorAction.GET_ARTICLES_ERROR: {
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

const initialCreateArticleState: CreateArticleState = {
    loading: false,
    message: "",
    error: undefined,
};

export const createArticleStateReducer: Reducer<CreateArticleState> =
    (state = initialCreateArticleState, action): CreateArticleState => {
    switch (action.type) {
        case AuthorAction.CREATE_ARTICLE: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
            };
        }
        case AuthorAction.CREATE_ARTICLE_SUCCESS: {
            const createArticleSuccess = action.payload as BaseResponse;

            return {
                ...state,
                loading: false,
                message: createArticleSuccess.message,
                error: undefined,
            };
        }
        case AuthorAction.CREATE_ARTICLE_ERROR: {
            const createArticleError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: createArticleError.message,
                error: createArticleError.error,
            };
        }
        default: {
            return state;
        }
    }
};

const initialUpdateArticleState: UpdateArticleState = {
    loading: false,
    message: "",
    error: undefined,
};

export const updateArticleStateReducer: Reducer<UpdateArticleState> =
    (state = initialUpdateArticleState, action): UpdateArticleState => {
    switch (action.type) {
        case AuthorAction.UPDATE_ARTICLE: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
            };
        }
        case AuthorAction.UPDATE_ARTICLE_SUCCESS: {
            const updateArticleSuccess = action.payload as BaseResponse;

            return {
                ...state,
                loading: false,
                message: updateArticleSuccess.message,
                error: undefined,
            };
        }
        case AuthorAction.UPDATE_ARTICLE_ERROR: {
            const updateArticleError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                error: updateArticleError.error,
            };
        }
        default: {
            return state;
        }
    }
};

const initialGetArticleDetailState: GetArticleDetailState = {
    loading: false,
    message: "",
    error: undefined,
    name: "",
    reviews: [],
};

export const getAuthorArticleDetailStateReducer: Reducer<GetArticleDetailState> =
    (state = initialGetArticleDetailState, action): GetArticleDetailState => {
    switch (action.type) {
        case AuthorAction.GET_ARTICLE_DETAIL: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
            };
        }
        case AuthorAction.GET_ARTICLE_DETAIL_SUCCESS: {
            const detailResponse = action.payload as GetArticleDetailResponse;
            const transformedReviews = detailResponse.reviews.map(review => {
                return {
                    id: review.id,
                    status: Object.values(ArticleReviewStatus).indexOf(review.status),
                    interest: review.interest,
                    originality: review.originality,
                    specializationLevel: review.specializationLevel,
                    languageLevel: review.languageLevel,
                    comment: review.comment,
                };
            });

            return {
                ...state,
                loading: false,
                message: detailResponse.message,
                error: undefined,
                name: detailResponse.name,
                reviews: transformedReviews,
            };
        }
        case AuthorAction.GET_ARTICLE_DETAIL_ERROR: {
            const getArticleDetail = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: getArticleDetail.message,
                error: getArticleDetail.error,
            };
        }
        default: {
            return state;
        }
    }
};
