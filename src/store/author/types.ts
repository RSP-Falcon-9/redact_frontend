import { ArticleReviewStatus } from "store/reviewer/types";
import { BaseResponse } from "requests/base-response";

export enum AuthorAction {
    GET_ARTICLES = "@@author/getArticles",
    GET_ARTICLES_SUCCESS = "@@author/getArticlesSuccess",
    GET_ARTICLES_ERROR = "@@author/getArticlesError",

    CREATE_ARTICLE = "@@author/createArticle",
    CREATE_ARTICLE_SUCCESS = "@@author/createArticleSuccess",
    CREATE_ARTICLE_ERROR = "@@author/createArticleError",

    UPDATE_ARTICLE = "@@author/updateArticle",
    UPDATE_ARTICLE_SUCCESS = "@@author/updateArticleSuccess",
    UPDATE_ARTICLE_ERROR = "@@author/updateArticleError",

    GET_ARTICLE_DETAIL = "@@author/getArticleDetail",
    GET_ARTICLE_DETAIL_SUCCESS = "@@author/getArticleDetailSuccess",
    GET_ARTICLE_DETAIL_ERROR = "@@author/getArticleDetailError",
}

export interface ArticleVersion {
    version: number;
    fileName: string;
    publishDate: Date;
}

export interface Article {
    id: string;
    name: string;
    versions: ArticleVersion[];
}

export interface AuthorArticleReview {
    id: string;
    status: ArticleReviewStatus;
    interest: number;
    originality: number;
    specializationLevel: number;
    languageLevel: number;
    comment: string;
}

export interface AuthorArticleResponse extends BaseResponse {
    id: string;
    status: string;
    interest: number;
    originality: number;
    specializationLevel: number;
    languageLevel: number;
    comment: string;
}

export interface GetArticlesResponse extends BaseResponse {
    articles: Article[];
}

export interface CreateArticleRequest {
    name: string;
    file: File;
}

export interface UpdateArticleRequest {
    id: string;
    file: File;
}

export interface GetArticleDetailRequest {
    articleId: string;
    version: number;
}

export interface GetArticleDetailResponse extends BaseResponse {
    name: string;
    reviews: AuthorArticleResponse[];
}

export interface GetArticlesState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
    readonly articles: Article[];
}

export interface CreateArticleState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
}

export interface UpdateArticleState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
}

export interface GetArticleDetailState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
    readonly name: string;
    readonly reviews: AuthorArticleReview[];
}

export interface AuthorState {
    readonly getArticles: GetArticlesState;
    readonly createArticle: CreateArticleState;
    readonly updateArticle: UpdateArticleState;
    readonly getArticleDetail: GetArticleDetailState;
}

export const GET_ARTICLES_URL = "/articles";
export const ARTICLE_URL = "/article/";

export const authorUpdateArticleEndpoint = (articleId: string): string =>
    `/article/${articleId}`;
export const authorArticleDetailEndpoint = (articleId: string, version: number): string =>
    `/article/${articleId}/${version}`;
