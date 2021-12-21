import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Router, Redirect } from "react-router-dom";

// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";

import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))
const DashboradLazy = lazy(() => import('./components/DashboardApp'))

import { createBrowserHistory } from "history";

import Header from "./components/Header";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})


const history = createBrowserHistory();

export default function App({ props }) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard')
        }
    }, [isSignedIn])

    return (
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>

                            <Route path="/dashboard" >
                                {!isSignedIn && <Redirect to="/" />}
                                <DashboradLazy />
                            </Route>
                            <Route path="/" >
                                <MarketingLazy />
                            </Route>
                        </Switch>
                    </Suspense>
                </div>
            </Router>
        </StylesProvider>
    )
}