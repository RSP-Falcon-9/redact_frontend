import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faDoorOpen, faEdit, faPlus, faTimes, faTrash, faInfo } from "@fortawesome/free-solid-svg-icons";
import { AdminUsers } from "components/pages/admin/admin-users";
import { AuthorMyArticles } from "components/pages/author/author-my-articles";
import { AuthorNewArticle } from "components/pages/author/author-new-article";
import { ReviewerAssignedArticles } from "components/pages/reviewer/reviewer-assigned-articles";
import { EditorPendingArticles } from "components/pages/editor/editor-pending-articles";
import { ArticleDetail } from "components/pages/common/common-article-detail";
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
    navigation.addNavigationRolePath({ path: "/author/articles/new", name: "Nahrát nový článek", role: "ROLE_AUTHOR", component: AuthorNewArticle });
    navigation.addNavigationRolePath({ path: "/author/articles", name: "Moje články", role: "ROLE_AUTHOR", component: AuthorMyArticles });
    navigation.addNavigationRolePath({ path: "/reviewer/articles", name: "Články k recenzi", role: "ROLE_REVIEWER", component: ReviewerAssignedArticles });
    navigation.addNavigationRolePath({ path: "/editor/articles", name: "Žádosti o posudek", role: "ROLE_EDITOR", component: EditorPendingArticles });

    return (
        <Provider store={storePersistor.store}>
            <PersistGate loading={null} persistor={storePersistor.persistor}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path={HOME_URL} component={HomePage} />
                        {navigation.rolePaths.map((rolePath, index) => {
                            return <PrivilegedRoute key={"privileged_route_" + index} exact path={rolePath.path} component={rolePath.component} role={rolePath.role} />;
                        })}
                        <PrivilegedRoute path="/article/:id" role="ROLE_AUTHOR" component={ArticleDetail} />
                    </Switch>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
