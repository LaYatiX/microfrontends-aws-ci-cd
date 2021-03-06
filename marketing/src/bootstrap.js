import React, { useEffect } from "react";
import ReactDOM from 'react-dom'
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

const mount = (el, { onNavigate, historyType, initialPath }) => {
    const history = historyType || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if (onNavigate)
        history.listen(onNavigate)

    ReactDOM.render(
        <App history={history} />,
        el
    )

    return {
        onParentNavigate({ pathname }) {
            if (history.location.pathname != pathname)
                history.push(pathname)
        }
    }
}

if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_marketing-dev-root');

    if (el) {
        mount(el, { historyType: createBrowserHistory() });
    }
}


export { mount }