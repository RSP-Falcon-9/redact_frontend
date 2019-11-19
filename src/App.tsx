import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faDoorOpen, faEdit, faPlus, faTimes, faTrash, faInfo } from "@fortawesome/free-solid-svg-icons";
import { AdminUsers } from "components/pages/admin/admin-users";
import { HomePage } from "components/pages/home-page";
import PrivilegedRoute from "components/privileged-route";
import configureStore from "configure-store";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";
import * as React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
// import PrivateRoute from "utils/components/private-route";
import { HOME_URL } from "utils/navigation";
import Navigation from "utils/navigation";

interface ReduxWindow extends Window {
    initialReduxState: any;
}

// stylization icons from fontawesome
library.add(faEdit, faTrash, faCheck, faDoorOpen, faTimes, faPlus, faInfo);

// app core components
const history = History.createBrowserHistory();
const initialState = (window as unknown as ReduxWindow).initialReduxState;
const storePersistor = configureStore(history, initialState);

function App() {
    const navigation = new Navigation(storePersistor.store);
    navigation.addNavigationRolePath({ path: "/admin/users", name: "Uživatelé", role: "ROLE_ADMIN", component: AdminUsers });

    return (
        <Provider store={storePersistor.store}>
            <PersistGate loading={null} persistor={storePersistor.persistor}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path={HOME_URL} component={HomePage} />
                        {navigation.rolePaths.map((rolePath, index) => {
                            return <PrivilegedRoute key={"privileged_route_" + index} exact path={rolePath.path} component={rolePath.component} role={rolePath.role} />;
                        })}
                    </Switch>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
