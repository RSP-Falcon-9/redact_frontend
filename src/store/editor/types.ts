import { ArticleVersion, ArticleVersionStatus } from "store/author/types";
import { ArticleReviewStatus } from "store/reviewer/types";
import { BaseResponse } from "requests/base-response";

export enum EditorAction {
    GET_ARTICLES = "@@editor/getArticles",
    GET_ARTICLES_SUCCESS = "@@editor/getArticlesSuccess",
    GET_ARTICLES_ERROR = "@@editor/getArticlesError",

    GET_ARTICLE_DETAIL = "@@editor/getArticleDetail",
    GET_ARTICLE_DETAIL_SUCCESS = "@@editor/getArticleDetailSuccess",
    GET_ARTICLE_DETAIL_ERROR = "@@editor/getArticleDetailError",

    GET_REVIEWERS = "@@editor/getReviewers",
    GET_REVIEWERS_SUCCESS = "@@editor/getReviewersSuccess",
    GET_REVIEWERS_ERROR = "@@editor/getReviewersError",

    SET_REVIEWER_TO_ARTICLE = "@@editor/setReviewerToArticle",
    SET_REVIEWER_TO_ARTICLE_SUCCESS = "@@editor/setReviewerToArticleSuccess",
    SET_REVIEWER_TO_ARTICLE_ERROR = "@@editor/setReviewerToArticleError",

    ACCEPT_ARTICLE = "@@editor/acceptArticle",
    ACCEPT_ARTICLE_SUCCESS = "@@editor/acceptArticleSuccess",
    ACCEPT_ARTICLE_ERROR = "@@editor/acceptArticleError",

    DENY_ARTICLE = "@@editor/denyArticle",
    DENY_ARTICLE_SUCCESS = "@@editor/denyArticleSuccess",
    DENY_ARTICLE_ERROR = "@@editor/denyArticleError",

    SET_REVIEW_VISIBILITY = "@@editor/setReviewVisibility",
    SET_REVIEW_VISIBILITY_SUCCESS = "@@editor/setReviewVisibilitySuccess",
    SET_REVIEW_VISIBILITY_ERROR = "@@editor/setReviewVisibilityError",
}

// data

export interface EditorArticle {
    id: string;
    name: string;
    authorId: string;
    versions: ArticleVersion[];
}

export interface Reviewer {
    userName: string;
}

// dtos

export interface GetEditorArticlesResponse {
    articles: EditorArticle[];
}

export interface GetEditorArticleDetailRequest {
    articleId: string;
    version: number;
}

export interface GetEditorArticleDetailResponse {
    name: string;
    reviews: EditorArticleReview[];
}

export interface GetReviewersResponse {
    reviewers: Reviewer[];
}

export interface SetReviewerToArticleRequest {
    reviewerId: string;
}

export interface EditorArticleReview {
    id: string;
    reviewer: Reviewer;
    status: ArticleReviewStatus;
    interest: number;
    originality: number;
    specializationLevel: number;
    languageLevel: number;
    comment: string;
    appeal: string;
    appealDate: Date;
    visibleToAuthor: boolean;
}

export interface SetReviewVisibilityResponse extends BaseResponse {
    reviewId: string;
    visibility: boolean;
}

export interface ChangeArticleStatusResponse extends BaseResponse {
    articleId: string;
    version: number;
}

// states

export interface EditorArticleVersionState {
    readonly version: number;
    readonly fileName: string;
    readonly publishDate: Date;
    readonly status: ArticleVersionStatus;
}

export interface EditorArticleState {
    readonly id: string;
    readonly name: string;
    readonly authorId: string;
    readonly versions: EditorArticleVersionState[];
}

export interface GetEditorArticlesState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
    readonly articles: EditorArticleState[];
}

export interface EditorArticleReviewState {
    readonly id: string;
    readonly reviewer: Reviewer;
    readonly status: ArticleReviewStatus;
    readonly interest: number;
    readonly originality: number;
    readonly specializationLevel: number;
    readonly languageLevel: number;
    readonly comment: string;
    readonly appeal: string;
    readonly appealDate: Date;
    readonly visibleToAuthor: boolean;
}

export interface GetEditorArticleDetailState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
    readonly name: string;
    readonly reviews: EditorArticleReviewState[];
}

export interface GetReviewersState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
    readonly reviewers: Reviewer[];
}

export interface SetReviewerToArticleState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
}

export interface AcceptArticleState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
}

export interface DenyArticleState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
}

export interface SetReviewVisibilityState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
}

export interface EditorState {
    readonly getEditorArticles: GetEditorArticlesState;
    readonly getEditorArticleDetail: GetEditorArticleDetailState;
    readonly getReviewers: GetReviewersState;
    readonly setReviewerToArticle: SetReviewerToArticleState;
    readonly acceptArticle: AcceptArticleState;
    readonly denyArticle: DenyArticleState;
    readonly setReviewVisibility: SetReviewVisibilityState;
}

export const GET_ARTICLES_URL = "/articles";
export const ARTICLE_URL = "/article/";
export const REVIEWERS_URL = "/reviewers";
export const assignReviewerEndpoint = (articleId: string, articleVersion: number): string =>
    `/reviewer/assign/${articleId}/${articleVersion}`;
export const editorArticleDetailEndpoint = (articleId: string, version: number): string =>
    `/article/${articleId}/${version}`;
export const acceptArticleEndpoint = (articleId: string, articleVersion: number): string =>
    `/accept/${articleId}/${articleVersion}`;
export const denyArticleEndpoint = (articleId: string, articleVersion: number): string =>
    `/deny/${articleId}/${articleVersion}`;
export const reviewVisibilityEndpoint = (reviewId: string, visibility: boolean): string =>
    `/review/${reviewId}?visibility=${visibility}`;
