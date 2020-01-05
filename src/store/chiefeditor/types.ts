import { BaseResponse } from "requests/base-response";
import { Edition } from "store/unauthenticated/types";

export enum ChiefEditorActions {
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
    readonly createEditionState: CreateEditionState;
    readonly deleteEditionState: DeleteEditionState;
    readonly archiveEditionState: ArchiveEditionState;
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

export const createEditionEndpoint = (): string =>
    `/edition`;
export const deleteEditionEndpoint = (editionId: number): string =>
    `/edition/${editionId}`;
export const archiveEditionEndpoint = (editionId: number): string =>
    `/edition/archive/${editionId}`;
