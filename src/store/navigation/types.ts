import React from "react";
import { RouteComponentProps } from "react-router";

export enum NavigationAction {
    NAVIGATION_ADD_ROLE_PATH = "@@navigation/addRolePath",
}

export interface RolePath {
    role: string;
    name: string;
    path: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export interface Path {
    name: string;
    path: string;
}

export interface NavigationState {
    readonly rolePaths: Record<string, Path[]>;
}
