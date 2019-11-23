import { action } from "typesafe-actions";
import { EditorAction, GetEditorArticleDetailRequest, GetEditorArticleDetailResponse, GetEditorArticlesResponse, GetReviewersResponse } from "./types";

export const getEditorArticlesRequest = () => action(EditorAction.GET_ARTICLES);
export const getEditorArticlesSuccess = (data: GetEditorArticlesResponse) => action(EditorAction.GET_ARTICLES_SUCCESS, data);
export const getEditorArticlesError = (message: string) => action(EditorAction.GET_ARTICLES_ERROR, message);

export const getEditorArticleDetailRequest = (data: GetEditorArticleDetailRequest) => action(EditorAction.GET_ARTICLE_DETAIL, data);
export const getEditorArticleDetailSuccess = (data: GetEditorArticleDetailResponse) => action(EditorAction.GET_ARTICLE_DETAIL_SUCCESS, data);
export const getEditorArticleDetailError = (message: string) => action(EditorAction.GET_ARTICLE_DETAIL_ERROR, message);

export const getReviewersRequest = () => action(EditorAction.GET_REVIEWERS);
export const getReviewersSuccess = (data: GetReviewersResponse) => action(EditorAction.GET_REVIEWERS_SUCCESS, data);
export const getReviewersError = (message: string) => action(EditorAction.GET_REVIEWERS_ERROR, message);
