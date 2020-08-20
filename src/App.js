import React from "react";
import {Link, Redirect, Route, Switch} from "react-router-dom";

import {Dashboard} from "./dashboard/Dashboard";
import {Heroes} from "./heroes/Heroes";
import styles from "./App.module.css";

const heroes =
[
    {"id": 11, "name": "Dr Nice"},
    {"id": 12, "name": "Narco"},
    {"id": 13, "name": "Bombasto"},
    {"id": 14, "name": "Celeritas"},
    {"id": 15, "name": "Magneta"},
    {"id": 16, "name": "RubberMan"},
    {"id": 17, "name": "Dynama"},
    {"id": 18, "name": "Dr IQ"},
    {"id": 19, "name": "Magma"},
    {"id": 20, "name": "Tornado"}
];

function App()
{
    const title = "Tour of Heroes";

    return (
        <div className={styles.App}>
            <h1>{title}</h1>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/heroes">Heroes</Link>
            </nav>
            <Switch>
                <Route path="/dashboard">
                    <Dashboard heroes={heroes}></Dashboard>
                </Route>
                <Route path="/heroes">
                    <Heroes heroes={heroes}></Heroes>
                </Route>
                <Route path="/">
                    <Redirect to="/dashboard"></Redirect>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
