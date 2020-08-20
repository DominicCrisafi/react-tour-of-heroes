# Managing Application State
In this section we will explore how to share global state without having to pass down props, and techniques for managing application state.

To see the sample app from this section clone the repository
```
git clone https://github.com/DominicCrisafi/react-tour-of-heroes.git toh-part5-state-management
```

## Context: Sharing global state
React's `Context` allows components to access shared data accross the app without the need for passing it through props. It is best suited for data that needs to be used by many components like the app's theme or language. When combined with other features like the `useState` or `useReducer` hooks, we end up with a powerful tool for managing the applications state.

Create a new folder `src/store` and add `Store.js`. We will start by creating a React `Context`.
```JSX
export const StoreContext = createContext();
```

In order to use this context we need to wrap a component in the Context Provider. We will create the Provider in the `Store` component and wrap the `Store`'s children.
```JSX
import React, {createContext} from "react";

export const StoreContext = createContext();

export const Store = ({children}) =>
{
    return (
        <StoreContext.Provider>
            {children}
        </StoreContext.Provider>
    );
}
```

Once we have a Context Provider we need to set a `value` prop that will be passed to components that subscribe to the context. Create a `hero` and `setHero` state from `useState` and pass them to the `value` prop.
```JSX
import React, {createContex, useState} from "react";

export const StoreContext = createContext();

export const Store = ({children}) =>
{
    const [heroes, setHeroes] = useState([]);

    return (
        <StoreContext.Provider value={[heroes, setHeroes]}>
            {children}
        </StoreContext.Provider>
    );
};
```

`import` the `store` in `index.js` and wrap the `Router` component.
```JSX
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

import "./index.css";
import App from "./App";
import {Store} from "./store/Store";

ReactDOM.render(
    <React.StrictMode>
        <Store>
            <Router>
                <App />
            </Router>
        </Store>
    </React.StrictMode>,
    document.getElementById("root")
);

```

To subscribe to context changes we need to use the `useContext` hook in our `App` component and pass it the `StoreContext` we created. Modify `App` to:
```JSX
import React, {useContext} from "react";
import {Link, Redirect, Route, Switch} from "react-router-dom";

import {Dashboard} from "./dashboard/Dashboard";
import {Heroes} from "./heroes/Heroes";
import {StoreContext} from "./store/Store";
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
    const [heroes, setHeroes] = useContext(StoreContext);
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
```

### Loading heroes from the server
Now that we are storing the heroes in our `Store` context, we need load the initial heroes. Remove the `heroes` from `App` and create a json file in `public` named `heroes.json`. Add the heroes list to your new json file.
```JSON
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
]
```

React provides a `useEffect` hook for side effects like data fetching, or DOM updating. `useEffect` takes a function and calls it after performing DOM updated. By default, `useEffect` will run every time the component renders, unless you pass in an optional array of parameters that the effect will watch for changes. Becuase we want to load the heroes only once we will pass in an empty array to prevent the effect from running more than once.
```JSX
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
```
