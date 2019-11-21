export enum ArticleAction {
    GET_AUTHOR_ARTICLES = "@@articles/author/getArticles",
    GET_AUTHOR_ARTICLES_SUCCESS = "@@articles/author/getArticlesSuccess",
    GET_AUTHOR_ARTICLES_ERROR = "@@articles/author/getAuthorArticlesError",

    /*GET_REVIEWER_ARTICLES = "@@articles/reviewer/getArticles",
    GET_REVIEWER_ARTICLES_SUCCESS = "@@articles/reviewer/getArticlesSuccess",
    GET_REVIEWER_ARTICLES_ERROR = "@@articles/reviewer/getAuthorArticlesError",

    CREATE_ARTICLE = "@@articles/create",
    CREATE_ARTICLE_SUCCESS = "@articles/createSuccess",
    CREATE_ARTICLE_ERROR = "@articles/createError",

    DELETE_ARTICLE = "@@articles/deleteArticle",
    DELETE_ARTICLE_SUCCESS = "@@articles/deleteSuccess",
    DELETE_ARTICLE_ERROR = "@@articles/deleteError",*/
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

/*export interface CreateArticleRequest {
    id: string;
    file: File;
}

export interface DeleteArticleRequest {
    id: string;
}*/

export interface GetArticlesState {
    readonly loading: boolean;
    readonly errors?: string;
    readonly articles: Article[];
}

/*export interface CreateArticleState {
    readonly loading: boolean;
    readonly errors?: string;
}

export interface DeleteArticleState {
    readonly loading: boolean;
    readonly errors?: string;
}*/

export interface ArticleState {
    readonly getArticles: GetArticlesState;
    //readonly createArticle: CreateArticleState;
    //readonly deleteArticle: DeleteArticleState;
}

export const GET_ARTICLES_URL = "/articles";
export const ARTICLE_URL = "/article/";
