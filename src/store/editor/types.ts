import { ArticleVersion } from "store/author/types";

export enum EditorAction {
    GET_ARTICLES = "@@editor/getArticles",
    GET_ARTICLES_SUCCESS = "@@editor/getArticlesSuccess",
    GET_ARTICLES_ERROR = "@@editor/getArticlesError",

    GET_ARTICLE_DETAIL = "@@editor/getArticleDetail",
    GET_ARTICLE_DETAIL_SUCCESS = "@editor/getArticleDetailSuccess",
    GET_ARTICLE_DETAIL_ERROR = "@editor/getArticleDetailError",

    GET_REVIEWERS = "@@editor/getReviewers",
    GET_REVIEWERS_SUCCESS = "@@editor/getReviewersSuccess",
    GET_REVIEWERS_ERROR = "@@editor/getReviewersError",
}

export interface EditorArticle {
    id: string;
    name: string;
    authorId: string;
    versions: ArticleVersion[];
}

export interface Reviewer {
    userName: string;
}

export interface GetEditorArticlesResponse {
    articles: EditorArticle[];
}

export interface GetEditorArticleDetailRequest {
    articleId: string;
    version: number;
}

export interface GetEditorArticleDetailResponse {
    name: string;
}

export interface GetReviewersResponse {
    reviewers: Reviewer[];
}

export interface GetEditorArticlesState {
    readonly loading: boolean;
    readonly message: string;
    readonly errors?: string;
    readonly articles: EditorArticle[];
}

export interface GetEditorArticleDetailState {
    readonly loading: boolean;
    readonly message: string;
    readonly errors?: string;
    readonly name: string;
}

export interface GetReviewersState {
    readonly loading: boolean;
    readonly message: string;
    readonly errors?: string;
    readonly reviewers: Reviewer[];
}

export interface EditorState {
    readonly getEditorArticles: GetEditorArticlesState;
    readonly getEditorArticleDetail: GetEditorArticleDetailState;
    readonly getReviewers: GetReviewersState;
}

export const GET_ARTICLES_URL = "/articles";
export const ARTICLE_URL = "/article/";
export const REVIEWERS_URL = "/reviewers";
