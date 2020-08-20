import React, {useContext, useEffect} from "react";
import {Link, Redirect, Route, Switch} from "react-router-dom";

import {Dashboard} from "./dashboard/Dashboard";
import {Heroes} from "./heroes/Heroes";
import {StoreContext} from "./store/Store";
import styles from "./App.module.css";

function App()
{
    const [heroes, setHeroes] = useContext(StoreContext);
    const title = "Tour of Heroes";

    useEffect(() =>
    {
        async function getHeroes()
        {
            const response = await fetch("heroes.json");
            const heroList = await response.json();

            setHeroes(heroList);
        }

        getHeroes();
    }, []);

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
