export interface BaseResponse {
    message: string;
}

export interface ErrorBaseResponse extends BaseResponse {
    error: string;
}
