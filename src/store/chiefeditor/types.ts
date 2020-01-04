import { BaseResponse } from "requests/base-response";

export enum ChiefEditorActions {
    GET_EDITIONS = "@@chiefEditor/getEditions",
    GET_EDITIONS_SUCCESS = "@@chiefEditor/getEditionsSuccess",
    GET_EDITIONS_ERROR = "@@chiefEditor/getEditionsError",

    CREATE_EDITION = "@@chiefEditor/createEdition",
    CREATE_EDITION_SUCCESS = "@@chiefEditor/createEditionSuccess",
    CREATE_EDITION_ERROR = "@@chiefEditor/createEditionError",

    DELETE_EDITION = "@@chiefEditor/deleteEdition",
    DELETE_EDITION_SUCCESS = "@@chiefEditor/deleteEditionSuccess",
    DELETE_EDITION_ERROR = "@@chiefEditor/deleteEditionError",

    ARCHIVE_EDITION = "@@chiefEditor/archiveEdition",
    ARCHIVE_EDITION_SUCCESS = "@@chiefEditor/archiveEditionSuccess",
    ARCHIVE_EDITION_ERROR = "@@chiefEditor/archiveEditionError",
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

export interface CreateEditionRequest {
    description: string;
    deadline: Date;
}

export interface CreateEditionResponse extends BaseResponse {
    edition: Edition;
}

export interface DeleteEditionResponse extends BaseResponse {
    editionId: number;
}

export interface ArchiveEditionResponse extends BaseResponse {
    editionId: number;
}

// states

export interface ChiefEditorState {
    readonly getEditionsState: GetEditionsState;
    readonly createEditionState: CreateEditionState;
    readonly deleteEditionState: DeleteEditionState;
    readonly archiveEditionState: ArchiveEditionState;
}

export interface GetEditionsState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
    readonly editions: Edition[];
}

export interface CreateEditionState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
}

export interface DeleteEditionState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
}

export interface ArchiveEditionState {
    readonly loading: boolean;
    readonly message: string;
    readonly error?: string;
}

export const CHIEF_EDITOR_ENDPOINT = "/chief-editor";

export const getEditionsEndpoint = (): string =>
    `/editions`;
export const createEditionEndpoint = (): string =>
    `/edition`;
export const deleteEditionEndpoint = (editionId: number): string =>
    `/edition/${editionId}`;
export const archiveEditionEndpoint = (editionId: number): string =>
    `/edition/archive/${editionId}`;
