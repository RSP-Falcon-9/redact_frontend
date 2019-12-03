import { action } from "typesafe-actions";
import { ArticleAction, GetArticleFileRequest, GetArticleFileResponse } from "./types";
import { ErrorBaseResponse } from "requests/base-response";

export const getArticleFileRequest = (request: GetArticleFileRequest) => action(ArticleAction.GET_ARTICLE_FILE, request);
export const getArticleFileSuccess = (response: GetArticleFileResponse) => action(ArticleAction.GET_ARTICLE_FILE_SUCCESS, response);
export const getArticleFileError = (errorResponse: ErrorBaseResponse) => action(ArticleAction.GET_ARTICLE_FILE_ERROR, errorResponse);
