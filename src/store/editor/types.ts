import { ArticleVersion } from "store/author/types";

export enum EditorAction {
    GET_ARTICLES = "@@editor/getArticles",
    GET_ARTICLES_SUCCESS = "@@editor/getArticlesSuccess",
    GET_ARTICLES_ERROR = "@@editor/getArticlesError",

    GET_ARTICLE_DETAIL = "@@editor/getArticleDetail",
    GET_ARTICLE_DETAIL_SUCCESS = "@editor/getArticleDetailSuccess",
    GET_ARTICLE_DETAIL_ERROR = "@editor/getArticleDetailError",
}

export interface EditorArticle {
    id: string;
    name: string;
    authorId: string;
    versions: ArticleVersion[];
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

export interface EditorState {
    readonly getEditorArticles: GetEditorArticlesState;
    readonly getEditorArticleDetail: GetEditorArticleDetailState;
}

export const GET_ARTICLES_URL = "/articles";
export const ARTICLE_URL = "/article/";
