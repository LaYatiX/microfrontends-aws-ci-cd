import React from 'react';
import { mount } from "marketing/MarketingApp";
import MarketingApp from "./components/MarketingApp";


console.log(mount);

export default function App(props) {
    return (
        <div>
            <h1>Hello from Container</h1>
            <hr />
            <MarketingApp />
        </div>
    )
}