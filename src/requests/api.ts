import { put, select } from "redux-saga/effects";
import { logout } from "store/auth/actions";
import { ApplicationState } from "store/root";
import { UNAUTHENTICATED_ENDPOINT } from "store/unauthenticated/types";
import { BACKEND_URL } from "utils/constants";
import { ADMIN_URL, ARTICLE_URL, AUTHOR_URL, EDITOR_URL, REVIEWER_URL } from "utils/navigation";
import { CHIEF_EDITOR_ENDPOINT } from "store/chiefeditor/types";

export enum Method {
    Get = "get",
    Put = "put",
    Post = "post",
    Delete = "delete",
}

export async function callApi(method: string, path: string, authToken?: string, data?: any) {
    const response = await fetch(BACKEND_URL + path, {
        method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: authToken ? "bearer " + authToken : "",
        },
        body: JSON.stringify(data),
    });

    return await response.json();
}

export async function callApiBlob(method: string, path: string, authToken?: string, data?: any) {
    const response = await fetch(BACKEND_URL + path, {
        method,
        headers: {
            "Content-Type": "application/json",
            authorization: authToken ? "bearer " + authToken : "",
        },
        body: JSON.stringify(data),
    });

    return await response.blob();
}

export async function callApiMultipart(method: string, path: string, data: any, authToken?: string) {
    const fdata = new FormData();

    for (const [key, value] of Object.entries(data)) {
        const typedVal = value as any;
        fdata.append(key, typedVal);
    }

    const response = await fetch(BACKEND_URL + path, {
        method,
        headers: {
            Accept: "application/json",
            authorization: authToken ? "bearer " + authToken : "",
        },
        body: fdata,
    });

    return await response.json();
}

export async function callArticleApiBlob(method: string, path: string, authToken?: string, data?: any) {
    return callApiBlob(method, ARTICLE_URL + path, authToken, data);
}

export async function callAdminApi(method: string, path: string, authToken?: string, data?: any) {
    return callApi(method, ADMIN_URL + path, authToken, data);
}

export async function callAuthorApi(method: string, path: string, authToken?: string, data?: any) {
    return callApi(method, AUTHOR_URL + path, authToken, data);
}

export async function callAuthorApiMultipart(method: string, path: string, authToken?: string, data?: any) {
    return callApiMultipart(method, AUTHOR_URL + path, data, authToken);
}

export async function callAuthorApiBlob(method: string, path: string, authToken?: string, data?: any) {
    return callApiBlob(method, AUTHOR_URL + path, authToken, data);
}

export async function callEditorApi(method: string, path: string, authToken?: string, data?: any) {
    return callApi(method, EDITOR_URL + path, authToken, data);
}

export async function callReviewerApi(method: string, path: string, authToken?: string, data?: any) {
    return callApi(method, REVIEWER_URL + path, authToken, data);
}

export async function callChiefEditorApi(method: string, path: string, authToken?: string, data?: any) {
    return callApi(method, CHIEF_EDITOR_ENDPOINT + path, authToken, data);
}

export async function callUnauthenticatedApi(method: string, path: string, authToken?: string, data?: any) {
    return callApi(method, UNAUTHENTICATED_ENDPOINT + path, authToken, data);
}

// TODO: Invalidate token upon expiration.
export function* getAuthTokenTEST() {
    return yield select(({ auth }: ApplicationState) => {
        if (auth.authToken !== "" && auth.authTokenExpiration < new Date()) {
            put(logout());
            return "";
        }

        return auth.authToken;
    });
}

export function* getAuthToken() {
    return yield select(({ auth }: ApplicationState) => auth.authToken);
}
