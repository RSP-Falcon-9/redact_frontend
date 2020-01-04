import { BaseResponse } from "requests/base-response";

export enum UnauthenticatedAction {
    GET_ARCHIVES = "@@unauthenticated/getArchives",
    GET_ARCHIVES_SUCCESS = "@@unauthenticated/getArchivesSuccess",
    GET_ARCHIVES_ERROR = "@@unauthenticated/getArchivesError",
}

// dtos

export interface GetArchivesResponse extends BaseResponse {
    archives: string[];
}

// states

export interface UnauthenticatedState {
    readonly archivesState: ArchivesState;
}

export interface ArchivesState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
    readonly archives: string[];
}

export const UNAUTHENTICATED_ENDPOINT = "/unauthenticated";

export const getArchivesEndpoint = (): string =>
    `/archives`;
