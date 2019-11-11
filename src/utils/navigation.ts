import { Store } from "redux";
import { RolePath } from "store/navigation/types";
import { navigationAddUrl } from "store/navigation/actions";

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
