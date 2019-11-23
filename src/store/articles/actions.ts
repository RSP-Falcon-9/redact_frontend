import { action } from "typesafe-actions";
import { ArticleAction, GetArticleFileRequest, GetArticleFileResponse } from "./types";

export const getArticleFileRequest = (data: GetArticleFileRequest) => action(ArticleAction.GET_ARTICLE_FILE, data);
export const getArticleFileSuccess = (data: GetArticleFileResponse) => action(ArticleAction.GET_ARTICLE_FILE_SUCCESS, data);
export const getArticleFileError = (message: string) => action(ArticleAction.GET_ARTICLE_FILE_ERROR, message);
