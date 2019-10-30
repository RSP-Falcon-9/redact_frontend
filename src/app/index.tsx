import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faDoorOpen, faEdit, faPlus, faPrint, faQrcode, faSync, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import LoginPage from "components/pages/login-page";
import configureStore from "configure-store";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import PrivateRoute from "utils/components/private-route";

require("../style/main.scss");

interface ReduxWindow extends Window {
    initialReduxState: any;
}

// stylization icons from fontawesome
library.add(faEdit, faSync, faTrash, faCheck, faDoorOpen, faPrint, faTimes, faPlus, faQrcode);

// app core components
const history = History.createBrowserHistory();
const initialState = (window as unknown as ReduxWindow).initialReduxState;
const storePersistor = configureStore(history, initialState);
const entryCode = () => (
    <Provider store={storePersistor.store}>
        <PersistGate loading={null} persistor={storePersistor.persistor}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path={AUTH_URL} component={LoginPage} />
                </Switch>
            </ConnectedRouter>
        </PersistGate>
    </Provider>);
const App = hot(entryCode);

ReactDOM.render(<App />, document.getElementById("main-entry"));
