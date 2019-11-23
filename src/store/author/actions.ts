import { action } from "typesafe-actions";
import { AuthorAction, CreateArticleRequest, GetArticleDetailRequest, GetArticlesResponse, GetArticleDetailResponse, UpdateArticleRequest } from "./types";

export const getArticlesRequest = () => action(AuthorAction.GET_ARTICLES);
export const getArticlesSuccess = (data: GetArticlesResponse) => action(AuthorAction.GET_ARTICLES_SUCCESS, data);
export const getArticlesError = (message: string) => action(AuthorAction.GET_ARTICLES_ERROR, message);

export const createArticleRequest = (data: CreateArticleRequest) => action(AuthorAction.CREATE_ARTICLE, data);
export const createArticleSuccess = (message: string) => action(AuthorAction.CREATE_ARTICLE_SUCCESS, message);
export const createArticleError = (message: string) => action(AuthorAction.CREATE_ARTICLE_ERROR, message);

export const updateArticleRequest = (data: UpdateArticleRequest) => action(AuthorAction.UPDATE_ARTICLE, data);
export const updateArticleSuccess = (message: string) => action(AuthorAction.UPDATE_ARTICLE_SUCCESS, message);
export const updateArticleError = (message: string) => action(AuthorAction.UPDATE_ARTICLE_ERROR, message);

export const getArticleDetailRequest = (data: GetArticleDetailRequest) => action(AuthorAction.GET_ARTICLE_DETAIL, data);
export const getArticleDetailSuccess = (data: GetArticleDetailResponse) => action(AuthorAction.GET_ARTICLE_DETAIL_SUCCESS, data);
export const getArticleDetailError = (message: string) => action(AuthorAction.GET_ARTICLE_DETAIL_ERROR, message);
