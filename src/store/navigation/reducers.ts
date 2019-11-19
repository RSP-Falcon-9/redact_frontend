import { NavigationState, NavigationAction, RolePath } from "./types";
import { Reducer } from "redux";

const initialState: NavigationState = {
    rolePaths: {},
};

export const navigationReducer: Reducer<NavigationState> = (state = initialState, action) => {
    switch (action.type) {
        case NavigationAction.NAVIGATION_ADD_ROLE_PATH: {
            const rolePath = action.payload as RolePath;
            const path = { name: rolePath.name, path: rolePath.path };
            let newRolePaths = { ...state.rolePaths };
            let roleExists = false;

            Object.entries(newRolePaths).forEach(([role, paths]) => {
                if (role === rolePath.role) {
                    newRolePaths[role] = [ ...paths, path];
                    roleExists = true;
                }
            });

            if (!roleExists) {
                newRolePaths = { ...newRolePaths, [rolePath.role]: [ path ] };
            }

            return { ...state, rolePaths: newRolePaths };
        }
        default: {
            return state;
        }
    }
};
