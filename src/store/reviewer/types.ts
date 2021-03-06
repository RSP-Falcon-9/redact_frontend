import { BaseResponse } from "requests/base-response";

export enum ReviewerAction {
    GET_ARTICLES = "@@reviewer/getArticles",
    GET_ARTICLES_SUCCESS = "@@reviewer/getArticlesSuccess",
    GET_ARTICLES_ERROR = "@@reviewer/getArticlesError",

    GET_ARTICLE_DETAIL = "@@reviewer/getArticleDetail",
    GET_ARTICLE_DETAIL_SUCCESS = "@reviewer/getArticleDetailSuccess",
    GET_ARTICLE_DETAIL_ERROR = "@reviewer/getArticleDetailError",

    REVIEW_ARTICLE = "@@reviewer/reviewArticle",
    REVIEW_ARTICLE_SUCCESS = "@@reviewer/reviewArticleSuccess",
    REVIEW_ARTICLE_ERROR = "@@reviewer/reviewArticleError",
}

export interface ReviewerArticle {
    id: string;
    name: string;
    version: number;
    fileName: string;
    publishDate: Date;
    status: string;
}

export enum ArticleReviewStatus {
    NEW,
    REVIEWED,
    APPEAL,
}

// dtos

export interface GetReviewerArticlesResponse extends BaseResponse {
    articles: ReviewerArticle[];
}

export interface GetReviewerArticleDetailRequest {
    articleId: string;
    version: number;
}

export interface GetReviewerArticleDetailResponse extends BaseResponse {
    name: string;
    reviewId: string;
    reviewDate: Date;
    reviewStatus: string;
    interest: number;
    originality: number;
    specializationLevel: number;
    languageLevel: number;
    comment: string;
    appeal: string;
    appealDate: Date;
}

export interface ReviewArticleRequest {
    interest: number;
    originality: number;
    specializationLevel: number;
    languageLevel: number;
    comment: string;
}

// states

export interface ReviewerArticleState {
    readonly id: string;
    readonly name: string;
    readonly version: number;
    readonly fileName: string;
    readonly publishDate: Date;
    readonly status: ArticleReviewStatus;
}

export interface GetReviewerArticlesState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
    readonly articles: ReviewerArticleState[];
}

export interface GetReviewerArticleDetailState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
    readonly id: string;
    readonly name: string;
    readonly reviewDate: Date;
    readonly reviewStatus: ArticleReviewStatus;
    readonly interest: number;
    readonly originality: number;
    readonly specializationLevel: number;
    readonly languageLevel: number;
    readonly comment: string;
    readonly appeal: string;
    readonly appealDate: Date;
}

export interface ReviewArticleState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
}

export interface ReviewerState {
    readonly getReviewerArticles: GetReviewerArticlesState;
    readonly getReviewerArticleDetail: GetReviewerArticleDetailState;
    readonly reviewArticle: ReviewArticleState;
}

export const GET_ARTICLES_URL = "/articles";
export const ARTICLE_URL = "/article/";
export const reviewEndpoint = (reviewId: string): string =>
    `/review/${reviewId}`;
export const reviewerArticleDetailEndpoint = (articleId: string, version: number): string =>
    `/article/${articleId}/${version}`;
