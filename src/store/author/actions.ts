import { action } from "typesafe-actions";
import { AuthorAction, CreateArticleRequest, GetArticleDetailRequest, GetArticlesResponse, GetArticleDetailResponse, GetArticleFileResponse, GetArticleFileRequest } from "./types";

export const getArticlesRequest = () => action(AuthorAction.GET_ARTICLES);
export const getArticlesSuccess = (data: GetArticlesResponse) => action(AuthorAction.GET_ARTICLES_SUCCESS, data);
export const getArticlesError = (message: string) => action(AuthorAction.GET_ARTICLES_ERROR, message);

export const createArticleRequest = (data: CreateArticleRequest) => action(AuthorAction.CREATE_ARTICLE, data);
export const createArticleSuccess = (message: string) => action(AuthorAction.CREATE_ARTICLE_SUCCESS, message);
export const createArticleError = (message: string) => action(AuthorAction.CREATE_ARTICLE_ERROR, message);

export const getArticleDetailRequest = (data: GetArticleDetailRequest) => action(AuthorAction.GET_ARTICLE_DETAIL, data);
export const getArticleDetailSuccess = (data: GetArticleDetailResponse) => action(AuthorAction.GET_ARTICLE_DETAIL_SUCCESS, data);
export const getArticleDetailError = (message: string) => action(AuthorAction.GET_ARTICLE_DETAIL_ERROR, message);

export const getArticleFileRequest = (data: GetArticleFileRequest) => action(AuthorAction.GET_ARTICLE_FILE, data);
export const getArticleFileSuccess = (data: GetArticleFileResponse) => action(AuthorAction.GET_ARTICLE_FILE_SUCCESS, data);
export const getArticleFileError = (message: string) => action(AuthorAction.GET_ARTICLE_FILE_ERROR, message);
