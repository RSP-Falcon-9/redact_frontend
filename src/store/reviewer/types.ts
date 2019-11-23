import { ArticleVersion } from "store/author/types";

export enum ReviewerAction {
    GET_ARTICLES = "@@reviewer/getArticles",
    GET_ARTICLES_SUCCESS = "@@reviewer/getArticlesSuccess",
    GET_ARTICLES_ERROR = "@@reviewer/getArticlesError",

    GET_ARTICLE_DETAIL = "@@reviewer/getArticleDetail",
    GET_ARTICLE_DETAIL_SUCCESS = "@reviewer/getArticleDetailSuccess",
    GET_ARTICLE_DETAIL_ERROR = "@reviewer/getArticleDetailError",
}

export interface ReviewerArticle {
    id: string;
    name: string;
    authorId: string;
    versions: ArticleVersion[];
}

export interface GetReviewerArticlesResponse {
    articles: ReviewerArticle[];
}

export interface GetReviewerArticleDetailRequest {
    articleId: string;
    version: number;
}

export interface GetReviewerArticleDetailResponse {
    name: string;
}

export interface GetReviewerArticlesState {
    readonly loading: boolean;
    readonly message: string;
    readonly errors?: string;
    readonly articles: ReviewerArticle[];
}

export interface GetReviewerArticleDetailState {
    readonly loading: boolean;
    readonly message: string;
    readonly errors?: string;
    readonly name: string;
}

export interface ReviewerState {
    readonly getReviewerArticles: GetReviewerArticlesState;
    readonly getReviewerArticleDetail: GetReviewerArticleDetailState;
}

export const GET_ARTICLES_URL = "/articles";
export const ARTICLE_URL = "/article/";
