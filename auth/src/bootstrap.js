import React, { useEffect } from "react";
import ReactDOM from 'react-dom'
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

const mount = (el, { onNavigate, historyType, initialPath, onSignIn }) => {
    const history = historyType || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if (onNavigate)
        history.listen(onNavigate)

    ReactDOM.render(
        <App history={history} onSignIn={onSignIn} />,
        el
    )

    return {
        onParentNavigate({ pathname }) {
            console.log(pathname);
            if (history.location.pathname != pathname)
                history.push(pathname)
        }
    }
}

if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_auth-dev-root');

    if (el) {
        mount(el, { historyType: createBrowserHistory() });
    }
}


export { mount }