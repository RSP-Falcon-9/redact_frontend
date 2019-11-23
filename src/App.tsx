import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faDoorOpen, faEdit, faInfo, faPlus, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AdminUsers } from "components/pages/admin/admin-users";
import { AuthorMyArticles } from "components/pages/author/author-my-articles";
import AuthorNewArticle from "components/pages/author/author-new-article";
import AuthorUpdateArticle from "components/pages/author/author-update-article";
import ArticleDetail from "components/pages/common/common-article-detail";
import { EditorPendingArticles } from "components/pages/editor/editor-pending-articles";
import { HomePage } from "components/pages/home-page";
import { ReviewerAssignedArticles } from "components/pages/reviewer/reviewer-assigned-articles";
import PrivilegedRoute from "components/privileged-route";
import configureStore from "configure-store";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";
import * as React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Navigation, { HOME_URL } from "utils/navigation";

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
                        <PrivilegedRoute path="/author/article/:id/:version" role="ROLE_AUTHOR" component={ArticleDetail} />
                        <PrivilegedRoute path="/author/articles/new/:id" role="ROLE_AUTHOR" component={AuthorUpdateArticle} />
                    </Switch>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
