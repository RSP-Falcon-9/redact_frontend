import { Store } from "redux";
import { RolePath } from "store/navigation/types";
import { navigationAddUrl } from "store/navigation/actions";

export const HOME_URL = "/";
export const ARCHIVES_URL = "/archives";
export const MANUAL_URL = "/manual";
export const AUTH_URL = "/login";
export const ARTICLE_URL = "/article";
export const ADMIN_URL = "/admin";
export const AUTHOR_URL = "/author";
export const EDITOR_URL = "/editor";
export const CHIEF_EDITOR_URL = "/chiefeditor";
export const REVIEWER_URL = "/reviewer";

export default class Navigation {

    store: Store;
    rolePaths: RolePath[];

    constructor(store: Store) {
        this.store = store;
        this.rolePaths = [];
    }

    addNavigationRolePath(rolePath: RolePath) {
        this.rolePaths.push(rolePath);
        this.store.dispatch(navigationAddUrl(rolePath));
    }

}
