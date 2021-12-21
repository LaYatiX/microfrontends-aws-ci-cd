import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";

import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))

import Header from "./components/Header";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

export default function App({ props }) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    return (
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/" >
                                <MarketingLazy />
                            </Route>
                        </Switch>
                    </Suspense>
                </div>
            </BrowserRouter>
        </StylesProvider>
    )
}