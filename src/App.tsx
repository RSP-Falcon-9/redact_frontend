import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faDoorOpen, faEdit, faPlus, faPrint, faQrcode, faSync, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { HomePage } from "components/pages/home-page";
import configureStore from "configure-store";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";
import * as React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
// import PrivateRoute from "utils/components/private-route";
import { HOME_URL } from "utils/constants";

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
    return (
        <Provider store={storePersistor.store}>
            <PersistGate loading={null} persistor={storePersistor.persistor}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path={HOME_URL} component={HomePage} />
                    </Switch>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
