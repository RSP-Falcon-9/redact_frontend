import { action } from "typesafe-actions";
import {
    EditorAction,
    GetEditorArticleDetailRequest,
    GetEditorArticleDetailResponse,
    GetEditorArticlesResponse,
    GetReviewersResponse,
    SetReviewerToArticleRequest,
    SetReviewVisibilityResponse,
    ChangeArticleStatusResponse,
    SetArticleEditionResponse} from "./types";
import { ErrorBaseResponse } from "requests/base-response";

export const getEditorArticlesRequest = () => action(EditorAction.GET_ARTICLES);
export const getEditorArticlesSuccess = (response: GetEditorArticlesResponse) => action(EditorAction.GET_ARTICLES_SUCCESS, response);
export const getEditorArticlesError = (errorResponse: ErrorBaseResponse) => action(EditorAction.GET_ARTICLES_ERROR, errorResponse);

export const getEditorArticleDetailRequest = (data: GetEditorArticleDetailRequest) => action(EditorAction.GET_ARTICLE_DETAIL, data);
export const getEditorArticleDetailSuccess = (response: GetEditorArticleDetailResponse) => action(EditorAction.GET_ARTICLE_DETAIL_SUCCESS, response);
export const getEditorArticleDetailError = (errorResponse: ErrorBaseResponse) => action(EditorAction.GET_ARTICLE_DETAIL_ERROR, errorResponse);

export const getReviewersRequest = () => action(EditorAction.GET_REVIEWERS);
export const getReviewersSuccess = (data: GetReviewersResponse) => action(EditorAction.GET_REVIEWERS_SUCCESS, data);
export const getReviewersError = (errorResponse: ErrorBaseResponse) => action(EditorAction.GET_REVIEWERS_ERROR, errorResponse);

export const setReviewerToArticleRequest = (articleId: string, version: number, data: SetReviewerToArticleRequest) => action(EditorAction.SET_REVIEWER_TO_ARTICLE, {articleId, version, data});
export const setReviewerToArticleSuccess = (response: ChangeArticleStatusResponse) => action(EditorAction.SET_REVIEWER_TO_ARTICLE_SUCCESS, response);
export const setReviewerToArticleError = (errorResponse: ErrorBaseResponse) => action(EditorAction.SET_REVIEWER_TO_ARTICLE_ERROR, errorResponse);

export const acceptArticleRequest = (articleId: string, version: number) => action(EditorAction.ACCEPT_ARTICLE, {articleId, version});
export const acceptArticleSuccess = (response: ChangeArticleStatusResponse) => action(EditorAction.ACCEPT_ARTICLE_SUCCESS, response);
export const acceptArticleError = (errorResponse: ErrorBaseResponse) => action(EditorAction.ACCEPT_ARTICLE_ERROR, errorResponse);

export const denyArticleRequest = (articleId: string, version: number) => action(EditorAction.DENY_ARTICLE, {articleId, version});
export const denyArticleSuccess = (response: ChangeArticleStatusResponse) => action(EditorAction.DENY_ARTICLE_SUCCESS, response);
export const denyArticleError = (errorResponse: ErrorBaseResponse) => action(EditorAction.DENY_ARTICLE_ERROR, errorResponse);

export const setReviewVisibilityRequest = (reviewId: string, visibility: boolean) => action(EditorAction.SET_REVIEW_VISIBILITY, {reviewId, visibility});
export const setReviewVisibilitySuccess = (response: SetReviewVisibilityResponse) => action(EditorAction.SET_REVIEW_VISIBILITY_SUCCESS, response);
export const setReviewVisibilityError = (errorResponse: ErrorBaseResponse) => action(EditorAction.SET_REVIEW_VISIBILITY_ERROR, errorResponse);

export const setArticleEditionRequest = (articleId: string, editionNumber: number) => action(EditorAction.SET_ARTICLE_EDITION, {articleId, editionNumber});
export const setArticleEditionSuccess = (response: SetArticleEditionResponse) => action(EditorAction.SET_ARTICLE_EDITION_SUCCESS, response);
export const setArticleEditionError = (errorResponse: ErrorBaseResponse) => action(EditorAction.SET_ARTICLE_EDITION_ERROR, errorResponse);
