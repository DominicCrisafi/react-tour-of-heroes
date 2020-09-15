# Adding In-App Routing
In this section we will add routing to the Tour of Heroes application using React Router. We will be adding:
- An app dashboard that displays the top heroes
- Navigation between the heroes and dashboard views
- Navigation to a hero's details

To see the sample app from this section clone the repository
```
git clone https://github.com/DominicCrisafi/react-tour-of-heroes.git toh-part4-routing
```

## Adding React Router
By default Create React App does not include the React Router. We will need to install it from the terminal. Navigate to the root of the project and run:
```
npm install react-router-dom
```

Once the router module is installed import it in `src/index.js`:
```JSX
import {BrowserRouter as Router} from "react-router-dom";
```

Wrap the `App` component in a `Browser` component. `index.js` should look like the following:
```JSX
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
```
The `Router` component is the core of React Router and typically will wrap the `App` component.

## Adding routes to the app
Now that the router is installed we can begin setting up routes. React Router uses the `Route` and `Switch` components to define routes and handle switching the views between matching routes. In your `App` component, `import` and add a `Switch` in place of the `Heroes` component.
```JSX
function App()
{
    const title = "Tour of Heroes";

    return (
        <div>
            <h1>{title}</h1>
            <Switch>

            </Switch>
        </div>
    );
}
```

Create a `Route` component within the `Switch` and set the path to `/heroes`, then add the `Heroes` component within the route.
```JSX
function App()
{
    const title = "Tour of Heroes";

    return (
        <div>
            <h1>{title}</h1>
            <Switch>
                <Route path="/heroes">
                    <Heroes heroes={heroes}></Heroes>
                </Route>
            </Switch>
        </div>
    );
}
```

When the app reloads, the title should appear, but the heroes are not showing. In the address bar, append `/heroes` and the heroes list should show.

## Navigation links
Manually typing the routes in the address bar is a bad experience, so let's add a nav bar to the app. React Router uses a `Link` component to create navigation links. Import the `Link` component, then create a `<nav>` element between your app title and `Switch`. Add a `Link` to `/heroes` in the nav.
```JSX
function App()
{
    const title = "Tour of Heroes";

    return (
        <div>
            <h1>{title}</h1>
            <nav>
                <Link to="/heroes">Heroes</Link>
            </nav>
            <Switch>
                <Route path="/heroes">
                    <Heroes heroes={heroes}></Heroes>
                </Route>
            </Switch>
        </div>
    );
}
```

## The Dashboard
Currently we only have a single view to route to. Let's add a dashboard component. Create a dashboard folder in `src` and then create `Dashboard.js`. Add the following to the file:
```JSX
import React from "react";
import {Link} from "react-router-dom";

import styles from "./Dashboard.module.css";

export const Dashboard = (props) =>
{
    const heroList = props.heroes
        .slice(1, 5)
        .map((hero) =>
        {
            return (
                <Link className={styles["col-1-4"]}>
                    <div className={`${styles.module}`}>
                        <h4>{hero.name}</h4>
                    </div>
                </Link>
            );
        });

    return (
        <div className={styles.Dashboard}>
            <h3>Top Heroes</h3>
            <div className={`${styles.grid} ${styles["grid-pad"]}`}>
                {heroList}
            </div>
        </div>
    );
};
```

Create the dashboard styles `Dashboard.module.css` and add:
```CSS
/* Dashboard component's private CSS styles */
.Dashboard [class*='col-']
{
    float: left;
    padding-right: 20px;
    padding-bottom: 20px;
}
.Dashboard [class*='col-']:last-of-type
{
    padding-right: 0;
}
.Dashboard a
{
    text-decoration: none;
}

.Dashboard *, .Dashboard *:after, .Dashboard *:before
{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.Dashboard h3
{
    text-align: center;
    margin-bottom: 0;
}
.Dashboard .module>h4
{
    position: relative;
}
.nav-link
{
    text-decoration: 'inherit',;
    color: "inherit";
}
.grid
{
    margin: 0;
}
.col-1-4
{
    width: 25%;
}
.module
{
    padding: 20px;
    text-align: center;
    color: #eee;
    max-height: 120px;
    min-width: 120px;
    background-color: #3f525c;
    border-radius: 2px;
}
.module:hover
{
    background-color: #eee;
    cursor: pointer;
    color: #607d8b;
}
.grid-pad
{
    padding: 10px 0;
}
.grid-pad > [class*='col-']:last-of-type
{
    padding-right: 20px;
}
@media (max-width: 600px)
{
    .module
    {
        font-size: 10px;
        max-height: 75px;
    }
}
@media (max-width: 1024px)
{
    .grid
    {
        margin: 0;
    }
    .module
    {
        min-width: 60px;
    }
}
```

The dashboard view displays a grid of four of the top heroes.

### Adding the dashboard route
Return to the `App` component and add a route to `/dashboard` above the heroes route that navigates to the `Dashboard` component.
```JSX
function App()
{
    const title = "Tour of Heroes";

    return (
        <div>
            <h1>{title}</h1>
            <nav>
                <Link to="/heroes">Heroes</Link>
            </nav>
            <Switch>
                <Route path="/dashboard">
                    <Dashboard heroes={heroes}></Dashboard>
                </Route>
                <Route path="/heroes">
                    <Heroes heroes={heroes}></Heroes>
                </Route>
            </Switch>
        </div>
    );
}
```

### Adding a Redirect
The dashboard route now works, but when the app loads the browser points to the site's root and no path is matched. We will need to add a redirect when the app loads to point to the `/dashboard` route.
`Import` the `Redirect` component in `App` and add a `Route` to handle `/` below the heroes route.
```JSX
function App()
{
    const title = "Tour of Heroes";

    return (
        <div>
            <h1>{title}</h1>
            <nav>
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

When adding routes, the `Switch` will search through each of it's children `Route`s and find the first one that matches. We should always put more specific paths before less specific ones, like the root path.

### Adding the dashboard link to the navbar
Create a nav `Link` to the dashboard just above the heroes nav item.
```JSX
function App()
{
    const title = "Tour of Heroes";

    return (
        <div>
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

### Styling the navbar
With multiple links on the navbar now, we need to add some styles. Create an `App.module.css` file and add the following:
```CSS
/* AppComponent's private CSS styles */
.App h1
{
    font-size: 1.2em;
    margin-bottom: 0;
}
.App nav a
{
    padding: 5px 10px;
    text-decoration: none;
    margin-top: 10px;
    display: inline-block;
    background-color: #eee;
    border-radius: 4px;
}
.App nav a:visited, a:link
{
    color: #334953;
}
.App nav a:hover
{
    color: #039be5;
    background-color: #cfd8dc;
}
.App nav a.active
{
    color: #039be5;
}
```

`import` the styles in the `App` component and add the `styles.App` class to the containing `<div>`.
```JSX
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
```

## Navigating to hero details
The app only displays hero details when a hero is selected from the heroes list at the moment. We need to be able to get to the details in three ways:
- Selecting a hero from the dashboard.
- Selecting a hero from the heroes list.
- Navigating with a link directly to the hero details.

To get this functionality we will move the `HeroDetail` and `HeroesList` components into their own routes in the `Heroes` component.

### Adding routing to Heroes component
Before we add the hero details route we need to move the `HeroesList` component into it's own route. Open the `Heroes` component. We will need a route that matches the current path when the component renders. We can use React Routers useRouteMatch hook for this.

The `useRouteMatch` hook allows us to match the URL in the same way as a `Route` component would. It returns a match object that contains a `path` property that we can use with the `Route`. `import` the `useRouteMatch` hook and destructure the `path`, then create the `Route` for the `HeroesList`.
```JSX
import React, {useState} from "react";
import {Route, useRouteMatch} from "react-router-dom";

import {HeroDetail} from "./HeroDetail";
import {HeroesList} from "./HeroesList"

export const Heroes = (props) =>
{
    const [currentHero, setCurrentHero] = useState(null);
    const {path} = useRouteMatch();
    const handleChange = (event) =>
    {
        setCurrentHero({name: event.target.value, id: currentHero.id});
    };
    const handleClick = (hero) =>
    {
        setCurrentHero(hero);
    };

    return (
        <div>
            <Route exact path={path}>
                <HeroesList heroes={props.heroes} selectedHeroId={currentHero?.id} handleClick={(hero) => handleClick(hero)}></HeroesList>
            </Route>
            {currentHero &&
                <HeroDetail hero={currentHero} handleChange={(e) => handleChange(e)}></HeroDetail>
            }
        </div>
    );
};
```

### Adding the details route
Next we need to add the route to the heroes detail. We want to have a route like `/heroes/11` to route to the hero with id 11. We will use the `path` to create a relative route and add a route URL parameter to determine the hero's id. Add the following `Route` and move the `HeroDetail` component inside:
```JSX
<Route path={`${path}/:id`}>
```
`:id` is a URL parameter that can be accessed in a child component with the `useParams` hook.

The `Heroes` component should look like this now:
```JSX
export const Heroes = (props) =>
{
    const [currentHero, setCurrentHero] = useState(null);
    const {path} = useRouteMatch();
    const handleChange = (event) =>
    {
        setCurrentHero({name: event.target.value, id: currentHero.id});
    };
    const handleClick = (hero) =>
    {
        setCurrentHero(hero);
    };

    return (
        <div>
            <Route exact path={path}>
                <HeroesList heroes={props.heroes} selectedHeroId={currentHero?.id} handleClick={(hero) => handleClick(hero)}></HeroesList>
            </Route>
            <Route path={`${path}/:id`}>
                {currentHero &&
                    <HeroDetail hero={currentHero} handleChange={(e) => handleChange(e)}></HeroDetail>
                }
            </Route>
        </div>
    );
};
```

### Dashboard hero links
The dashboard currently doesn't link to anything. Now that we have a route to the hero details, we can add the links to the dashboard.
```JSX
const heroList = props.heroes
    .slice(1, 5)
    .map((hero) =>
    {
        return (
            <Link className={styles["col-1-4"]} to={`/heroes/${hero.id}`}>
                <div className={`${styles.module}`}>
                    <h4>{hero.name}</h4>
                </div>
            </Link>
        );
    });
```

### Heroes list links
For the `HeroesList`, we can remove the class and click handler from the list items and wrap the hero in a `Link`. We can also remove the selectedHero prop from the component.
```JSX
export const HeroesList = (props) =>
{
    const heroes = props.heroes.map((hero) =>
    {
        return (
            <li key={hero.id}>
                <Link to={`/heroes/${hero.id}`}>
                    <span className={styles.badge}>{hero.id}</span> {hero.name}
                </Link>
            </li>
        );
    });

    return (
        <div>
            <h2>My Heroes</h2>
            <ul className={styles.HeroesList}>
                {heroes}
            </ul>
        </div>
    );
}
```

And here is the cleaned up `Heroes` component:
```JSX
export const Heroes = (props) =>
{
    const [currentHero, setCurrentHero] = useState(null);
    const {path} = useRouteMatch();
    const handleChange = (event) =>
    {
        setCurrentHero({name: event.target.value, id: currentHero.id});
    };

    return (
        <div>
            <Route exact path={path}>
                <HeroesList heroes={props.heroes}></HeroesList>
            </Route>
            <Route path={`${path}/:id`}>
                {currentHero &&
                    <HeroDetail hero={currentHero} handleChange={(e) => handleChange(e)}></HeroDetail>
                }
            </Route>
        </div>
    );
};
```
Modify the `HeroesList.module.css` styles to contain the following:
```CSS
/* HeroesList component private CSS styles */
.HeroesList
{
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
}
.HeroesList li
{
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
}
.HeroesList li:hover
{
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
}
.HeroesList a
{
    color: #333;
    text-decoration: none;
    position: relative;
    display: block;
    width: 250px;
}
.HeroesList a:hover
{
    color: #607D8B;
}
.badge
{
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color:#405061;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    min-width: 16px;
    text-align: right;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
}
```

### Getting the selected hero
Before adding routing the `HeroList` component passed the selected hero to the `Heroes` component and to the `HeroDetail` component. Now we want the selected hero to come from the URL. We need to be able to get the id from the current URL and then find the selected hero.

We will use the `useRouteMatch` hook again. This time we will pass the detail route and get the params from it. Add the following to the `Heroes` component:
```JSX
const heroDetailMatch = useRouteMatch(`${path}/:id`);
const currentHero = heroDetailMatch
    ? props.heroes
        .find((hero) =>
        {
            return hero.id === parseInt(heroDetailMatch.params.heroId);
        })
    : null;
```

Remove the `useState` call, `handleClick` function and prop from the `HeroDetail` component. The `Heroes` component should look like this;
```JSX
import React from "react";
import {Route, useRouteMatch} from "react-router-dom";

import {HeroDetail} from "./HeroDetail";
import {HeroesList} from "./HeroesList"

export const Heroes = (props) =>
{
    const {path} = useRouteMatch();
    const heroDetailMatch = useRouteMatch(`${path}/:id`);
    const currentHero = heroDetailMatch
        ? props.heroes
            .find((hero) =>
            {
                return hero.id === parseInt(heroDetailMatch.params.id);
            })
        : null;

    return (
        <div>
            <Route exact path={path}>
                <HeroesList heroes={props.heroes}></HeroesList>
            </Route>
            <Route path={`${path}/:id`}>
                {currentHero &&
                    <HeroDetail hero={currentHero}></HeroDetail>
                }
            </Route>
        </div>
    );
};
```

Now that we have removed the change handler from the `HeroDetail` component, we need to move the input change into the local state. Change `HeroDetail` to:
```JSX
import React, {useState} from "react";

export const HeroDetail = (props) =>
{
    const [hero, setHero] = useState({...props.hero});
    const handleChange = (event) =>
    {
        const updatedHero =
        {
            ...hero,
            name: event.target.value
        };

        setHero(updatedHero);
    };

    return (
        <div>
            <h2>{hero.name.toUpperCase()} Details</h2>
            <div>
                <span>id: </span>{hero.id}
            </div>
            <div>
                <label>
                    name:
                    <input value={hero.name} onChange={handleChange} placeholder="name"></input>
                </label>
            </div>
        </div>
    );
}
```
We set the initial component state to the selected hero, then change the local state whenever the input value changes.

### Navigating back
Now we will add a back button on the `HeroDetail` view using React Router's `useHistory` hook. `useHistory` gives us a `history` object that has a `goBack` function.

Add a go back button below the details.
```JSX
import React, {useState} from "react";
import {useHistory} from "react-router-dom";

export const HeroDetail = (props) =>
{
    const [hero, setHero] = useState({...props.hero});
    const {goBack} = useHistory();
    const handleChange = (event) =>
    {
        const updatedHero =
        {
            ...hero,
            name: event.target.value
        };

        setHero(updatedHero);
    };

    return (
        <div>
            <h2>{hero.name.toUpperCase()} Details</h2>
            <div>
                <span>id: </span>{hero.id}
            </div>
            <div>
                <label>
                    name:
                    <input value={hero.name} onChange={handleChange} placeholder="name"></input>
                </label>
            </div>
            <button onClick={goBack}>Go Back</button>
        </div>
    );
}
```

Create a `HeroDetail.module.css` file and addthe following:
```CSS
/* HeroDetail component's private CSS styles */
.HeroDetail label
{
    display: inline-block;
    width: 3em;
    margin: .5em 0;
    color: #607D8B;
    font-weight: bold;
}
.HeroDetail input
{
    height: 2em;
    font-size: 1em;
    padding-left: .4em;
}
.HeroDetail button
{
    margin-top: 20px;
    font-family: Arial;
    background-color: #eee;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}
.HeroDetail button:hover
{
    background-color: #cfd8dc;
}
.HeroDetail button:disabled
{
    background-color: #eee;
    color: #ccc;
    cursor: auto;
}
```

Import the CSS and then add `className={styles.HeroDetail}` to the root `<div>` in the `HeroDetail` component.

## Final code review
Here are the final code files.

### `app/index.js`
```JSX
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
```

### `src/App.js`
```JSX
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
```

### `src/App.module.css`
```CSS
/* AppComponent's private CSS styles */
.App h1
{
    font-size: 1.2em;
    margin-bottom: 0;
}
.App nav a
{
    padding: 5px 10px;
    text-decoration: none;
    margin-top: 10px;
    display: inline-block;
    background-color: #eee;
    border-radius: 4px;
}
.App nav a:visited, a:link
{
    color: #334953;
}
.App nav a:hover
{
    color: #039be5;
    background-color: #cfd8dc;
}
.App nav a.active
{
    color: #039be5;
}
```

### `src/dashboard/Dashboard.js`
```JSX
import React from "react";
import {Link} from "react-router-dom";

import styles from "./Dashboard.module.css";

export const Dashboard = (props) =>
{
    const heroList = props.heroes
        .slice(1, 5)
        .map((hero) =>
        {
            return (
                <Link className={styles["col-1-4"]} to={`/heroes/${hero.id}`}>
                    <div className={`${styles.module}`}>
                        <h4>{hero.name}</h4>
                    </div>
                </Link>
            );
        });

    return (
        <div className={styles.Dashboard}>
            <h3>Top Heroes</h3>
            <div className={`${styles.grid} ${styles["grid-pad"]}`}>
                {heroList}
            </div>
        </div>
    );
};
```

### `src/dashboard/Dashboard.module.css`
```CSS
/* Dashboard component's private CSS styles */
.Dashboard [class*='col-']
{
    float: left;
    padding-right: 20px;
    padding-bottom: 20px;
}
.Dashboard [class*='col-']:last-of-type
{
    padding-right: 0;
}
.Dashboard a
{
    text-decoration: none;
}

.Dashboard *, .Dashboard *:after, .Dashboard *:before
{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.Dashboard h3
{
    text-align: center;
    margin-bottom: 0;
}
.Dashboard .module>h4
{
    position: relative;
}
.nav-link
{
    text-decoration: 'inherit',;
    color: "inherit";
}
.grid
{
    margin: 0;
}
.col-1-4
{
    width: 25%;
}
.module
{
    padding: 20px;
    text-align: center;
    color: #eee;
    max-height: 120px;
    min-width: 120px;
    background-color: #3f525c;
    border-radius: 2px;
}
.module:hover
{
    background-color: #eee;
    cursor: pointer;
    color: #607d8b;
}
.grid-pad
{
    padding: 10px 0;
}
.grid-pad > [class*='col-']:last-of-type
{
    padding-right: 20px;
}
@media (max-width: 600px)
{
    .module
    {
        font-size: 10px;
        max-height: 75px;
    }
}
@media (max-width: 1024px)
{
    .grid
    {
        margin: 0;
    }
    .module
    {
        min-width: 60px;
    }
}
```

### `src/heroes/HeroDetail.js`
```JSX
import React, {useState} from "react";
import {useHistory} from "react-router-dom";

import styles from "./HeroDetail.module.css";

export const HeroDetail = (props) =>
{
    const [hero, setHero] = useState({...props.hero});
    const {goBack} = useHistory();
    const handleChange = (event) =>
    {
        const updatedHero =
        {
            ...hero,
            name: event.target.value
        };

        setHero(updatedHero);
    };

    return (
        <div className={styles.HeroDetail}>
            <h2>{hero.name.toUpperCase()} Details</h2>
            <div>
                <span>id: </span>{hero.id}
            </div>
            <div>
                <label>
                    name:
                    <input value={hero.name} onChange={handleChange} placeholder="name"></input>
                </label>
            </div>
            <button onClick={goBack}>Go Back</button>
        </div>
    );
}
```

### `src/heroes/HeroDetail.module.css`
```CSS
/* HeroDetail component's private CSS styles */
.HeroDetail label
{
    display: inline-block;
    width: 3em;
    margin: .5em 0;
    color: #607D8B;
    font-weight: bold;
}
.HeroDetail input
{
    height: 2em;
    font-size: 1em;
    padding-left: .4em;
}
.HeroDetail button
{
    margin-top: 20px;
    font-family: Arial;
    background-color: #eee;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}
.HeroDetail button:hover
{
    background-color: #cfd8dc;
}
.HeroDetail button:disabled
{
    background-color: #eee;
    color: #ccc;
    cursor: auto;
}
```

### `src/heroes/Heroes.js`
```JSX
import React from "react";
import {Route, useRouteMatch} from "react-router-dom";

import {HeroDetail} from "./HeroDetail";
import {HeroesList} from "./HeroesList"

export const Heroes = (props) =>
{
    const {path} = useRouteMatch();
    const heroDetailMatch = useRouteMatch(`${path}/:id`);
    const currentHero = heroDetailMatch
        ? props.heroes
            .find((hero) =>
            {
                return hero.id === parseInt(heroDetailMatch.params.id);
            })
        : null;

    return (
        <div>
            <Route exact path={path}>
                <HeroesList heroes={props.heroes}></HeroesList>
            </Route>
            <Route path={`${path}/:id`}>
                {currentHero &&
                    <HeroDetail hero={currentHero}></HeroDetail>
                }
            </Route>
        </div>
    );
};
```

### `src/heroes/HeroesList.js`
```JSX
import React from "react";
import {Link} from "react-router-dom";

import styles from "./HeroesList.module.css";

export const HeroesList = (props) =>
{
    const heroes = props.heroes.map((hero) =>
    {
        return (
            <li key={hero.id}>
                <Link to={`/heroes/${hero.id}`}>
                    <span className={styles.badge}>{hero.id}</span> {hero.name}
                </Link>
            </li>
        );
    });

    return (
        <div>
            <h2>My Heroes</h2>
            <ul className={styles.HeroesList}>
                {heroes}
            </ul>
        </div>
    );
}
```

### `src/heroes/HeroesList.module.css`
```CSS
/* HeroesList component private CSS styles */
.HeroesList
{
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
}
.HeroesList li
{
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
}
.HeroesList li:hover
{
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
}
.HeroesList a
{
    color: #333;
    text-decoration: none;
    position: relative;
    display: block;
    width: 250px;
}
.HeroesList a:hover
{
    color: #607D8B;
}
.badge
{
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color:#405061;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    min-width: 16px;
    text-align: right;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
}
```

## Summary
- You added the React Router package to the project to handle app navigation.
- You created a `Router` around the `App` component.
- You created `Routes` to navigate and a `Redirect` display the dashboard when the app loads.
- You used a `Route` with URL parameters to display the hero details.
- You created a navbar and added `Link`s throughout the app.


[Next Steps: Part 5 - Managing Application State](5-app-state.md)
