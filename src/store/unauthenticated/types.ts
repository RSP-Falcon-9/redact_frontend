import { BaseResponse } from "requests/base-response";

export enum UnauthenticatedAction {
    GET_EDITIONS = "@@unauthenticated/getEditions",
    GET_EDITIONS_SUCCESS = "@@unauthenticated/getEditionsSuccess",
    GET_EDITIONS_ERROR = "@@unauthenticated/getEditionsError",

    GET_ARCHIVES = "@@unauthenticated/getArchives",
    GET_ARCHIVES_SUCCESS = "@@unauthenticated/getArchivesSuccess",
    GET_ARCHIVES_ERROR = "@@unauthenticated/getArchivesError",
}

// dtos

export interface Edition {
    id: number;
    description: string;
    deadline: Date;
    archived: Boolean;
}

export interface GetEditionsResponse extends BaseResponse {
    editions: Edition[];
}

export interface GetArchivesResponse extends BaseResponse {
    archives: string[];
}

// states

export interface UnauthenticatedState {
    readonly getEditionsState: GetEditionsState;
    readonly archivesState: ArchivesState;
}

export interface GetEditionsState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
    readonly editions: Edition[];
}

export interface ArchivesState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
    readonly archives: string[];
}

export const UNAUTHENTICATED_ENDPOINT = "/unauthenticated";

export const getEditionsEndpoint = (): string =>
    `/editions`;
export const getArchivesEndpoint = (): string =>
    `/archives`;
