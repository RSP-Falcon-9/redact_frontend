import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faDoorOpen, faEdit, faPlus, faPrint, faQrcode, faSync, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import EmptyComponent from "components/empty";
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
import { HOME_URL } from "utils/constants";
import Navigation from "utils/navigation";

interface ReduxWindow extends Window {
    initialReduxState: any;
}

// stylization icons from fontawesome
library.add(faEdit, faSync, faTrash, faCheck, faDoorOpen, faPrint, faTimes, faPlus, faQrcode);

// app core components
const history = History.createBrowserHistory();
const initialState = (window as unknown as ReduxWindow).initialReduxState;
const storePersistor = configureStore(history, initialState);

function App() {
    const navigation = new Navigation(storePersistor.store);
    navigation.addNavigationRolePath({ path: "/admin/users", name: "Uživatelé", role: "ROLE_ADMIN", component: AdminUsers });
    navigation.addNavigationRolePath({ path: "/admin/test2", name: "Test2", role: "ROLE_ADMIN", component: HomePage });
    navigation.addNavigationRolePath({ path: "/admin/test3", name: "Test3", role: "ROLE_ADMIN", component: EmptyComponent });
    navigation.addNavigationRolePath({ path: "/admin/test4", name: "Test4", role: "ROLE_ADMIN", component: HomePage });

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
