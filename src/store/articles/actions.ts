import { ArticleAction, GetArticlesResponse } from "store/articles/types";
import { action } from "typesafe-actions";

export const getArticlesRequest = () => action(ArticleAction.GET_AUTHOR_ARTICLES);
export const getArticlesSuccess = (data: GetArticlesResponse) => action(ArticleAction.GET_AUTHOR_ARTICLES_SUCCESS, data);
export const getArticlesError = (message: string) => action(ArticleAction.GET_AUTHOR_ARTICLES_ERROR, message);

//export const createArticleRequest = (userName: string, data: CreateUserRequest) => action(AdminAction.CREATE_USER, {userName, data});
//export const createArticleSuccess = (user: User) => action(ArticleAction.CREATE_ARTICLE_SUCCESS, user);
//export const createArticleError = (message: string) => action(ArticleAction.CREATE_ARTICLE_ERROR, message);

//export const deleteArticleRequest = (userName: string) => action(ArticleAction.DELETE_ARTICLE, userName);
//export const deleteArticleSuccess = (userName: string) => action(ArticleAction.DELETE_ARTICLE_SUCCESS, userName);
//export const deleteArticleError = (message: string) => action(ArticleAction.DELETE_ARTICLE_ERROR, message);
