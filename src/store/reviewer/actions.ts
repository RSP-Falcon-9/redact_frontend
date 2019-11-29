import { action } from "typesafe-actions";
import { BaseResponse, ErrorBaseResponse } from "requests/base-response";
import { GetReviewerArticleDetailRequest, GetReviewerArticleDetailResponse, GetReviewerArticlesResponse, ReviewArticleRequest, ReviewerAction } from "./types";

export const getReviewerArticlesRequest = () => action(ReviewerAction.GET_ARTICLES);
export const getReviewerArticlesSuccess = (data: GetReviewerArticlesResponse) => action(ReviewerAction.GET_ARTICLES_SUCCESS, data);
export const getReviewerArticlesError = (message: string) => action(ReviewerAction.GET_ARTICLES_ERROR, message);

export const getReviewerArticleDetailRequest = (data: GetReviewerArticleDetailRequest) => action(ReviewerAction.GET_ARTICLE_DETAIL, data);
export const getReviewerArticleDetailSuccess = (data: GetReviewerArticleDetailResponse) => action(ReviewerAction.GET_ARTICLE_DETAIL_SUCCESS, data);
export const getReviewerArticleDetailError = (message: string) => action(ReviewerAction.GET_ARTICLE_DETAIL_ERROR, message);

export const reviewArticleRequest = (id: string, data: ReviewArticleRequest) => action(ReviewerAction.REVIEW_ARTICLE, {id, data});
export const reviewArticleSuccess = (data: BaseResponse) => action(ReviewerAction.REVIEW_ARTICLE_SUCCESS, data);
export const reviewArticleError = (data: ErrorBaseResponse) => action(ReviewerAction.REVIEW_ARTICLE_ERROR, data);
