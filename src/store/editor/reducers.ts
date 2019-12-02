import { Reducer } from "redux";
import { EditorAction, GetEditorArticleDetailResponse, GetEditorArticleDetailState, GetEditorArticlesState, GetEditorArticlesResponse, GetReviewersState, GetReviewersResponse, SetReviewerToArticleState, AcceptArticleState, DenyArticleState } from "./types";

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

            return {
                ...state,
                loading: false,
                message: action.payload.message,
                error: undefined,
                articles: articlesResponse.articles,
            };
        }
        case EditorAction.GET_ARTICLES_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload,
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

            return {
                ...state,
                loading: false,
                message: action.payload.message,
                error: undefined,
                name: detailResponse.name,
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
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                error: undefined,
            };
        }
        case EditorAction.ACCEPT_ARTICLE_ERROR: {
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

const initialDenyArticleState: DenyArticleState = {
    loading: false,
    message: "",
    error: undefined,
};

export const denyArticleReducer: Reducer<DenyArticleState> =
    (state = initialDenyArticleState, action): DenyArticleState => {
    switch (action.type) {
        case EditorAction.ACCEPT_ARTICLE: {
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        }
        case EditorAction.ACCEPT_ARTICLE_SUCCESS: {
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                error: undefined,
            };
        }
        case EditorAction.ACCEPT_ARTICLE_ERROR: {
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
