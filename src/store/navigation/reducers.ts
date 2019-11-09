import { NavigationState, NavigationAction, RolePath } from "./types";
import { Reducer } from "redux";

const initialState: NavigationState = {
    rolePaths: {},
};

export const navigationReducer: Reducer<NavigationState> = (state = initialState, action) => {
    switch (action.type) {
        case NavigationAction.NAVIGATION_ADD_ROLE_PATH: {
            const rolePath = action.payload as RolePath;
            const newRolePaths = { ...state.rolePaths };

            Object.entries(newRolePaths).forEach(([role, paths]) => {
                if (role === rolePath.name) {
                    newRolePaths[role] = [ ...paths, { name: rolePath.name, path: rolePath.path } ];
                }
            });

            return { ...state, rolePaths: newRolePaths };
        }
        default: {
            return state;
        }
    }
};
