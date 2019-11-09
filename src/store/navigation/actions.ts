import { action } from "typesafe-actions";
import { NavigationAction, RolePath } from "./types";

export const navigationAddUrl = (rolePath: RolePath) => action(NavigationAction.NAVIGATION_ADD_ROLE_PATH, rolePath);
