import { Reducer } from "redux";
import { GetArticlesState, ArticleAction, GetArticlesResponse } from "store/articles/types";

const initialGetAllUsersState: GetArticlesState = {
    loading: false,
    articles: [],
    errors: undefined,
};

export const getArticlesStateReducer: Reducer<GetArticlesState> = (state = initialGetAllUsersState, action) => {
    switch (action.type) {
        case ArticleAction.GET_AUTHOR_ARTICLES: {
            return { ...state, loading: true, errors: undefined };
        }
        case ArticleAction.GET_AUTHOR_ARTICLES_SUCCESS: {
            const getAuthorArticlesResponse = action.payload as GetArticlesResponse;

            return { ...state, loading: false, articles: getAuthorArticlesResponse.articles, errors: undefined };
        }
        case ArticleAction.GET_AUTHOR_ARTICLES_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};
