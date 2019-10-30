import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { ApplicationState, createRootReducer, rootSaga } from "store/root";

interface StorePersistor {
    store: Store<ApplicationState>;
    persistor: Persistor;
}

export default function configureStore(
  history: History,
  initialState: ApplicationState,
): StorePersistor {
    const persistConfig = {
      key: "redact",
      storage,
      whitelist: ["auth"],
    };
    const persistedReducer = persistReducer(persistConfig, createRootReducer(history));
    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        persistedReducer,
        initialState,
        composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
    );
    const persistor = persistStore(store);

    sagaMiddleware.run(rootSaga);

    return { store, persistor };
}
