import { action } from "typesafe-actions";
import { BaseResponse, ErrorBaseResponse } from "requests/base-response";
import {
    GetReviewerArticleDetailRequest,
    GetReviewerArticleDetailResponse,
    GetReviewerArticlesResponse,
    ReviewArticleRequest,
    ReviewerAction } from "./types";

export const getReviewerArticlesRequest = () => action(ReviewerAction.GET_ARTICLES);
export const getReviewerArticlesSuccess = (response: GetReviewerArticlesResponse) => action(ReviewerAction.GET_ARTICLES_SUCCESS, response);
export const getReviewerArticlesError = (errorResponse: ErrorBaseResponse) => action(ReviewerAction.GET_ARTICLES_ERROR, errorResponse);

export const getReviewerArticleDetailRequest = (request: GetReviewerArticleDetailRequest) => action(ReviewerAction.GET_ARTICLE_DETAIL, request);
export const getReviewerArticleDetailSuccess = (response: GetReviewerArticleDetailResponse) => action(ReviewerAction.GET_ARTICLE_DETAIL_SUCCESS, response);
export const getReviewerArticleDetailError = (errorResponse: ErrorBaseResponse) => action(ReviewerAction.GET_ARTICLE_DETAIL_ERROR, errorResponse);

export const reviewArticleRequest = (id: string, request: ReviewArticleRequest) => action(ReviewerAction.REVIEW_ARTICLE, {id, request});
export const reviewArticleSuccess = (response: BaseResponse) => action(ReviewerAction.REVIEW_ARTICLE_SUCCESS, response);
export const reviewArticleError = (errorResponse: ErrorBaseResponse) => action(ReviewerAction.REVIEW_ARTICLE_ERROR, errorResponse);
