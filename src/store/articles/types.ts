export enum ArticleAction {
    GET_ARTICLE_FILE = "@@article/getArticleFile",
    GET_ARTICLE_FILE_SUCCESS = "@article/getArticleFileSuccess",
    GET_ARTICLE_FILE_ERROR = "@article/getArticleFileError",
}

export interface GetArticleFileRequest {
    articleId: string;
    version: number;
}

export interface GetArticleFileResponse {
    data: Int8Array;
}

export interface GetArticleFileState {
    readonly loading: boolean;
    readonly message: string;
    readonly errors?: string;
    readonly fileUrl?: string;
}

export interface ArticleState {
    readonly getArticleFile: GetArticleFileState;
}

export const ARTICLE_URL = "/article/";
