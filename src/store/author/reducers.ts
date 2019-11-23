import { Reducer } from "redux";
import { GetArticlesState, AuthorAction, GetArticlesResponse, CreateArticleState, GetArticleDetailState, GetArticleDetailResponse, UpdateArticleState } from "./types";

const initialGetArticlesState: GetArticlesState = {
    loading: false,
    message: "",
    errors: undefined,
    articles: [],
};

export const getAuthorArticlesStateReducer: Reducer<GetArticlesState> = (state = initialGetArticlesState, action) => {
    switch (action.type) {
        case AuthorAction.GET_ARTICLES: {
            return { ...state, loading: true, errors: undefined };
        }
        case AuthorAction.GET_ARTICLES_SUCCESS: {
            const getAuthorArticlesResponse = action.payload as GetArticlesResponse;

            return { ...state, loading: false, message: action.payload.message, errors: undefined, articles: getAuthorArticlesResponse.articles };
        }
        case AuthorAction.GET_ARTICLES_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};

const initialCreateArticleState: CreateArticleState = {
    loading: false,
    message: "",
    errors: undefined,
};

export const createArticleStateReducer: Reducer<CreateArticleState> = (state = initialCreateArticleState, action) => {
    switch (action.type) {
        case AuthorAction.CREATE_ARTICLE: {
            return { ...state, loading: true, errors: undefined };
        }
        case AuthorAction.CREATE_ARTICLE_SUCCESS: {
            return { ...state, loading: false, message: action.payload.message, errors: undefined };
        }
        case AuthorAction.GET_ARTICLES_ERROR: {
            return { ...state, loading: false, errors: action.payload.error };
        }
        default: {
            return state;
        }
    }
};

const initialUpdateArticleState: UpdateArticleState = {
    loading: false,
    message: "",
    errors: undefined,
};

export const updateArticleStateReducer: Reducer<UpdateArticleState> = (state = initialUpdateArticleState, action) => {
    switch (action.type) {
        case AuthorAction.CREATE_ARTICLE: {
            return { ...state, loading: true, errors: undefined };
        }
        case AuthorAction.CREATE_ARTICLE_SUCCESS: {
            return { ...state, loading: false, message: action.payload.message, errors: undefined };
        }
        case AuthorAction.GET_ARTICLES_ERROR: {
            return { ...state, loading: false, errors: action.payload.error };
        }
        default: {
            return state;
        }
    }
};

const initialGetArticleDetailState: GetArticleDetailState = {
    loading: false,
    message: "",
    errors: undefined,
    name: "",
};

export const getAuthorArticleDetailStateReducer: Reducer<GetArticleDetailState> = (state = initialGetArticleDetailState, action) => {
    switch (action.type) {
        case AuthorAction.GET_ARTICLE_DETAIL: {
            return { ...state, loading: true, errors: undefined };
        }
        case AuthorAction.GET_ARTICLE_DETAIL_SUCCESS: {
            const detailResponse = action.payload as GetArticleDetailResponse;

            return { ...state, loading: false, message: action.payload.message, errors: undefined, name: detailResponse.name };
        }
        case AuthorAction.GET_ARTICLE_DETAIL_ERROR: {
            return { ...state, loading: false, message: action.payload.message, errors: action.payload.error };
        }
        default: {
            return state;
        }
    }
};
