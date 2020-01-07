import { Reducer } from "redux";
import {
    EditorAction,
    GetEditorArticleDetailResponse,
    GetEditorArticleDetailState,
    GetEditorArticlesState,
    GetEditorArticlesResponse,
    GetReviewersState,
    GetReviewersResponse,
    SetReviewerToArticleState,
    AcceptArticleState,
    DenyArticleState,
    SetReviewVisibilityState,
    EditorArticleReviewState,
    SetReviewVisibilityResponse,
    EditorArticleState,
    ChangeArticleStatusResponse,
    SetArticleEditionState,
    SetArticleEditionResponse} from "./types";
import { BaseResponse, ErrorBaseResponse } from "requests/base-response";
import { ArticleReviewStatus } from "store/reviewer/types";
import { ArticleVersionStatus } from "store/author/types";

const initialGetArticlesState: GetEditorArticlesState = {
    loading: false,
    message: "",
    error: undefined,
    articles: [],
};

export const getEditorArticlesStateReducer: Reducer<GetEditorArticlesState> =
    (state = initialGetArticlesState, action): GetEditorArticlesState => {
    switch (action.type) {
        case EditorAction.GET_ARTICLES: {
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        }
        case EditorAction.GET_ARTICLES_SUCCESS: {
            const articlesResponse = action.payload as GetEditorArticlesResponse;
            const transformedArticles: EditorArticleState[] = articlesResponse.articles.map(article => {
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
                message: action.payload.message,
                error: undefined,
                articles: transformedArticles,
            };
        }
        case EditorAction.GET_ARTICLES_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case EditorAction.ACCEPT_ARTICLE_SUCCESS: {
            const acceptArticleSuccessResponse = action.payload as ChangeArticleStatusResponse;
            const transformedArticles: EditorArticleState[] = state.articles.map(article => {
                if (article.id === acceptArticleSuccessResponse.articleId) {
                    return {
                        ...article,
                        versions: article.versions.map(version => {
                            if (version.version === acceptArticleSuccessResponse.version) {
                                return {
                                    ...version,
                                    status: ArticleVersionStatus.ACCEPTED,
                                };
                            }

                            return version;
                        }),
                    };
                }

                return article;
            });

            return {
                ...state,
                articles: transformedArticles,
            };
        }
        case EditorAction.DENY_ARTICLE_SUCCESS: {
            const denyArticleSuccessResponse = action.payload as ChangeArticleStatusResponse;
            const transformedArticles: EditorArticleState[] = state.articles.map(article => {
                if (article.id === denyArticleSuccessResponse.articleId) {
                    return {
                        ...article,
                        versions: article.versions.map(version => {
                            if (version.version === denyArticleSuccessResponse.version) {
                                return {
                                    ...version,
                                    status: ArticleVersionStatus.DENIED,
                                };
                            }

                            return version;
                        }),
                    };
                }

                return article;
            });

            return {
                ...state,
                articles: transformedArticles,
            };
        }
        case EditorAction.SET_REVIEWER_TO_ARTICLE_SUCCESS: {
            const setReviewerToArticleSuccessResponse = action.payload as ChangeArticleStatusResponse;
            const transformedArticles: EditorArticleState[] = state.articles.map(article => {
                if (article.id === setReviewerToArticleSuccessResponse.articleId) {
                    return {
                        ...article,
                        versions: article.versions.map(version => {
                            if (version.version === setReviewerToArticleSuccessResponse.version) {
                                return {
                                    ...version,
                                    status: ArticleVersionStatus.REVIEW_PENDING,
                                };
                            }

                            return version;
                        }),
                    };
                }

                return article;
            });

            return {
                ...state,
                articles: transformedArticles,
            };
        }
        default: {
            return state;
        }
    }
};

const initialGetArticleDetailState: GetEditorArticleDetailState = {
    loading: false,
    message: "",
    error: undefined,
    name: "",
    reviews: [],
};

export const getEditorArticleDetailStateReducer: Reducer<GetEditorArticleDetailState> =
    (state = initialGetArticleDetailState, action): GetEditorArticleDetailState => {
    switch (action.type) {
        case EditorAction.GET_ARTICLE_DETAIL: {
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        }
        case EditorAction.GET_ARTICLE_DETAIL_SUCCESS: {
            const detailResponse = action.payload as GetEditorArticleDetailResponse;
            const transformedReviews: EditorArticleReviewState[] = detailResponse.reviews.map(review => {
                return {
                    ...review,
                    status: Object.values(ArticleReviewStatus).indexOf(review.status),
                };
            });

            return {
                ...state,
                loading: false,
                message: action.payload.message,
                error: undefined,
                name: detailResponse.name,
                edition: detailResponse.edition,
                reviews: transformedReviews,
            };
        }
        case EditorAction.GET_ARTICLE_DETAIL_ERROR: {
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
            };
        }
        case EditorAction.SET_REVIEW_VISIBILITY_SUCCESS: {
            const setReviewVisibilitySuccessResponse = action.payload as SetReviewVisibilityResponse;

            const transformedReviews: EditorArticleReviewState[] = state.reviews.map(review => {
                if (review.id === setReviewVisibilitySuccessResponse.reviewId) {
                    return {
                        ...review,
                        visibleToAuthor: setReviewVisibilitySuccessResponse.visibility,
                    };
                }

                return review;
            });

            return {
                ...state,
                reviews: transformedReviews,
            };
        }
        default: {
            return state;
        }
    }
};

const initialGetReviewersState: GetReviewersState = {
    loading: false,
    message: "",
    error: undefined,
    reviewers: [],
};

export const getReviewersStateReducer: Reducer<GetReviewersState> =
    (state = initialGetReviewersState, action): GetReviewersState => {
    switch (action.type) {
        case EditorAction.GET_REVIEWERS: {
            return {
                ...state,
                loading: true,
                message: "",
                error: undefined,
            };
        }
        case EditorAction.GET_REVIEWERS_SUCCESS: {
            const detailResponse = action.payload as GetReviewersResponse;

            return {
                ...state,
                loading: false,
                message: action.payload.message,
                error: undefined,
                reviewers: detailResponse.reviewers,
            };
        }
        case EditorAction.GET_REVIEWERS_ERROR: {
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

const initialSetReviewerToArticleState: SetReviewerToArticleState = {
    loading: false,
    message: "",
    error: undefined,
};

export const setReviewerToArticleStateReducer: Reducer<SetReviewerToArticleState> =
    (state = initialSetReviewerToArticleState, action): SetReviewerToArticleState => {
    switch (action.type) {
        case EditorAction.SET_REVIEWER_TO_ARTICLE: {
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        }
        case EditorAction.SET_REVIEWER_TO_ARTICLE_SUCCESS: {
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                error: undefined,
            };
        }
        case EditorAction.SET_REVIEWER_TO_ARTICLE_ERROR: {
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

const initialAcceptArticleState: AcceptArticleState = {
    loading: false,
    message: "",
    error: undefined,
};

export const acceptArticleReducer: Reducer<AcceptArticleState> =
    (state = initialAcceptArticleState, action): AcceptArticleState => {
    switch (action.type) {
        case EditorAction.ACCEPT_ARTICLE: {
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        }
        case EditorAction.ACCEPT_ARTICLE_SUCCESS: {
            const acceptArticleSuccess = action.payload as BaseResponse;

            return {
                ...state,
                loading: false,
                message: acceptArticleSuccess.message,
                error: undefined,
            };
        }
        case EditorAction.ACCEPT_ARTICLE_ERROR: {
            const acceptArticleError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: acceptArticleError.message,
                error: acceptArticleError.error,
            };
        }
        default: {
            return state;
        }
    }
};

const initialDenyArticleState: DenyArticleState = {
    loading: false,
    message: "",
    error: undefined,
};

export const denyArticleReducer: Reducer<DenyArticleState> =
    (state = initialDenyArticleState, action): DenyArticleState => {
    switch (action.type) {
        case EditorAction.DENY_ARTICLE: {
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        }
        case EditorAction.DENY_ARTICLE_SUCCESS: {
            const denyArticleSuccess = action.payload as BaseResponse;

            return {
                ...state,
                loading: false,
                message: denyArticleSuccess.message,
                error: undefined,
            };
        }
        case EditorAction.DENY_ARTICLE_ERROR: {
            const denyArticleError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: denyArticleError.message,
                error: denyArticleError.error,
            };
        }
        default: {
            return state;
        }
    }
};

const initialSetReviewVisibilityState: SetReviewVisibilityState = {
    loading: false,
    message: "",
    error: undefined,
};

export const setReviewVisibilityReducer: Reducer<SetReviewVisibilityState> =
    (state = initialSetReviewVisibilityState, action): SetReviewVisibilityState => {
    switch (action.type) {
        case EditorAction.SET_REVIEW_VISIBILITY: {
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        }
        case EditorAction.SET_REVIEW_VISIBILITY_SUCCESS: {
            const setVisibilitySuccess = action.payload as SetReviewVisibilityResponse;

            return {
                ...state,
                loading: false,
                message: setVisibilitySuccess.message,
                error: undefined,
            };
        }
        case EditorAction.SET_REVIEW_VISIBILITY_ERROR: {
            const setVisibilityError = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: setVisibilityError.message,
                error: setVisibilityError.error,
            };
        }
        default: {
            return state;
        }
    }
};

const initialSetArticleEditionState: SetArticleEditionState = {
    loading: false,
    message: "",
    error: undefined,
};

export const setArticleEditionStateReducer: Reducer<SetArticleEditionState> =
    (state = initialSetArticleEditionState, action): SetArticleEditionState => {
    switch (action.type) {
        case EditorAction.SET_ARTICLE_EDITION: {
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        }
        case EditorAction.SET_ARTICLE_EDITION_SUCCESS: {
            const success = action.payload as SetArticleEditionResponse;

            return {
                ...state,
                loading: false,
                message: success.message,
                error: undefined,
            };
        }
        case EditorAction.SET_ARTICLE_EDITION_ERROR: {
            const error = action.payload as ErrorBaseResponse;

            return {
                ...state,
                loading: false,
                message: error.message,
                error: error.error,
            };
        }
        default: {
            return state;
        }
    }
};
