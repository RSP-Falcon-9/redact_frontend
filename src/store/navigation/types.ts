import React from "react";

export enum NavigationAction {
    NAVIGATION_ADD_ROLE_PATH = "@@navigation/addRolePath",
}

export interface RolePath {
    role: string;
    name: string;
    path: string;
    component: typeof React.Component;
}

export interface Path {
    name: string;
    path: string;
}

export interface NavigationState {
    readonly rolePaths: Record<string, Path[]>;
}
