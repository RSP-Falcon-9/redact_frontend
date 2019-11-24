export interface BaseDto {
    message: string;
}

export interface ErrorBaseDto extends BaseDto {
    error: string;
}
