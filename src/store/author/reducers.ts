import { Reducer } from "redux";
import { ArticleReviewStatus } from "store/reviewer/types";
import {
    AuthorAction,
    CreateArticleState,
    GetArticleDetailResponse,
    GetArticleDetailState,
    GetArticlesResponse,
    GetArticlesState,
    UpdateArticleState,
    ArticleVersionStatus,
    AuthorArticleReview,
    AppealReviewState,
    UpdateArticleSuccessResponse,
    AuthorArticle} from "./types";
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
                            status: Object.values(ArticleVersionStatus).indexOf(version.status),
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
        case AuthorAction.UPDATE_ARTICLE_SUCCESS: {
            const updateArticleSuccessResponse = action.payload as UpdateArticleSuccessResponse;

            const articlesMap: AuthorArticle[] = state.articles.map(article => {
                if (article.id === updateArticleSuccessResponse.id) {
                    return {
                        ...updateArticleSuccessResponse,
                        versions: updateArticleSuccessResponse.versions.map(version => {
                            return {
                                ...version,
                                status: Object.values(ArticleVersionStatus).indexOf(version.status),
                            };
                        }),
                    };
                }

                return article;
            });

            return {
                ...state,
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
        // Probably workaround to fix strange behaviour.
        case AuthorAction.GET_ARTICLES: {
            return initialCreateArticleState;
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
                message: updateArticleError.message,
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
    edition: undefined,
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
            const transformedReviews: AuthorArticleReview[] = detailResponse.reviews.map(review => {
                return {
                    id: review.id,
                    status: Object.values(ArticleReviewStatus).indexOf(review.status),
                    interest: review.interest,
                    originality: review.originality,
                    specializationLevel: review.specializationLevel,
                    languageLevel: review.languageLevel,
                    comment: review.comment,
                    appeal: review.appeal,
                    appealDate: review.appealDate,
                };
            });

            return {
                ...state,
                loading: false,
                message: detailResponse.message,
                error: undefined,
                name: detailResponse.name,
                edition: detailResponse.edition,
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

const initialAppealReviewState: AppealReviewState = {
    loading: false,
    message: "",
    error: undefined,
};

export const appealReviewStateReducer: Reducer<AppealReviewState> =
    (state = initialAppealReviewState, action): AppealReviewState => {
    switch (action.type) {
        case AuthorAction.APPEAL_REVIEW: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
            };
        }
        case AuthorAction.APPEAL_REVIEW_SUCCESS: {
            const appealReviewSuccess = action.payload as BaseResponse;

            return {
                ...state,
                loading: false,
                message: appealReviewSuccess.message,
                error: undefined,
            };
        }
        case AuthorAction.APPEAL_REVIEW_ERROR: {
            const appealReviewError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: appealReviewError.message,
                error: appealReviewError.error,
            };
        }
        default: {
            return state;
        }
    }
};
