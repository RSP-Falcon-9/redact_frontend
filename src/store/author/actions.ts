import { action } from "typesafe-actions";
import {
    AuthorAction,
    CreateArticleRequest,
    GetArticleDetailRequest,
    GetArticlesResponse,
    GetArticleDetailResponse,
    UpdateArticleRequest } from "./types";
import { BaseResponse, ErrorBaseResponse } from "requests/base-response";

export const getArticlesRequest = () => action(AuthorAction.GET_ARTICLES);
export const getArticlesSuccess = (response: GetArticlesResponse) => action(AuthorAction.GET_ARTICLES_SUCCESS, response);
export const getArticlesError = (errorResponse: ErrorBaseResponse) => action(AuthorAction.GET_ARTICLES_ERROR, errorResponse);

export const createArticleRequest = (request: CreateArticleRequest) => action(AuthorAction.CREATE_ARTICLE, request);
export const createArticleSuccess = (response: BaseResponse) => action(AuthorAction.CREATE_ARTICLE_SUCCESS, response);
export const createArticleError = (errorResponse: ErrorBaseResponse) => action(AuthorAction.CREATE_ARTICLE_ERROR, errorResponse);

export const updateArticleRequest = (request: UpdateArticleRequest) => action(AuthorAction.UPDATE_ARTICLE, request);
export const updateArticleSuccess = (response: BaseResponse) => action(AuthorAction.UPDATE_ARTICLE_SUCCESS, response);
export const updateArticleError = (errorResponse: ErrorBaseResponse) => action(AuthorAction.UPDATE_ARTICLE_ERROR, errorResponse);

export const getArticleDetailRequest = (request: GetArticleDetailRequest) => action(AuthorAction.GET_ARTICLE_DETAIL, request);
export const getArticleDetailSuccess = (response: GetArticleDetailResponse) => action(AuthorAction.GET_ARTICLE_DETAIL_SUCCESS, response);
export const getArticleDetailError = (errorResponse: ErrorBaseResponse) => action(AuthorAction.GET_ARTICLE_DETAIL_ERROR, errorResponse);
