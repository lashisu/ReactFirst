import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./_reducers";
import App from "./containers/app";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const composeEnhancer: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history) // for dispatching history actions
      // ... other middlewares ...
    )
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
