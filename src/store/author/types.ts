export enum AuthorAction {
    GET_ARTICLES = "@@author/getArticles",
    GET_ARTICLES_SUCCESS = "@@author/getArticlesSuccess",
    GET_ARTICLES_ERROR = "@@author/getArticlesError",

    CREATE_ARTICLE = "@@author/createArticle",
    CREATE_ARTICLE_SUCCESS = "@author/createArticleSuccess",
    CREATE_ARTICLE_ERROR = "@author/createArticleError",

    GET_ARTICLE_DETAIL = "@@author/getArticleDetail",
    GET_ARTICLE_DETAIL_SUCCESS = "@author/getArticleDetailSuccess",
    GET_ARTICLE_DETAIL_ERROR = "@author/getArticleDetailError",

    GET_ARTICLE_FILE = "@@author/getArticleFile",
    GET_ARTICLE_FILE_SUCCESS = "@author/getArticleFileSuccess",
    GET_ARTICLE_FILE_ERROR = "@author/getArticleFileError",
}

interface ArticleVersion {
    version: number;
    fileName: string;
    publishDate: Date;
}

export interface Article {
    id: string;
    name: string;
    versions: ArticleVersion[];
}

export interface GetArticlesResponse {
    articles: Article[];
}

export interface CreateArticleRequest {
    name: string;
    file: File;
}

export interface GetArticleDetailRequest {
    articleId: string;
    version: number;
}

export interface GetArticleDetailResponse {
    name: string;
}

export interface GetArticleFileRequest {
    articleId: string;
    version: number;
}

export interface GetArticleFileResponse {
    data: Int8Array;
}

export interface GetArticlesState {
    readonly loading: boolean;
    readonly message: string;
    readonly errors?: string;
    readonly articles: Article[];
}

export interface CreateArticleState {
    readonly loading: boolean;
    readonly message: string;
    readonly errors?: string;
}

export interface GetArticleDetailState {
    readonly loading: boolean;
    readonly message: string;
    readonly errors?: string;
    readonly name: string;
}

export interface GetArticleFileState {
    readonly loading: boolean;
    readonly message: string;
    readonly errors?: string;
    readonly fileUrl?: string;
}

export interface AuthorState {
    readonly getArticles: GetArticlesState;
    readonly createArticle: CreateArticleState;
    readonly getArticleDetail: GetArticleDetailState;
    readonly getArticleFile: GetArticleFileState;
}

export const GET_ARTICLES_URL = "/articles";
export const ARTICLE_URL = "/article/";
