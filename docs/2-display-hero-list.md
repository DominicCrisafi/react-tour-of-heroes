# Display a List of Heroes
In this section, we are going to create a list of heroes and display the details when a user selects a hero.

To see the sample app from this section clone the repository
```
git clone https://github.com/DominicCrisafi/react-tour-of-heroes.git toh-part2-list
```

## Creating mock heroes
First we will need some heroes to display.

We will add the list of heroes to the `App` component and end up passing them through the app as props.
Add an array of ten heroes to the `App` component and pass them as a prop named `heroes` to the `Heroes` component. The file should look like:
```JSX
import React from "react";

import {Heroes} from "./heroes/Heroes";

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
        <div>
            <h1>{title}</h1>
            <Heroes heroes={heroes}></Heroes>
        </div>
    );
}

export default App;
```

## Displaying the heroes
Make the following changes to the `Heroes` component view
- Add an `<h2>` above the hero details heading
- Create an unordered list (`<ul>`) below the new heading
- Add a call to `renderHeroes()` within the `<ul>` and pass it the list of heroes from `props`

Your view should now look like:
```JSX
render()
{
    return  (
        <div>
            <h2>My Heroes</h2>
            <ul>
                {this.renderHeroes(this.props.heroes)}
            </ul>
            <h2>{this.state.hero.name.toUpperCase()} Details</h2>
            <div>
                <span>id: </span>{this.state.hero.id}
            </div>
            <div>
                <label>
                    name:
                    <input value={this.state.hero.name} onChange={(e) => this.handleChange(e)}placeholder="name"></input>
                </label>
            </div>
        </div>
    );
}
```

Now let's create the `renderHeroes()` method. We want this method to take the list of heroes and return an array of `<li>`s that display the hero's id and name. Add a method to your `Heroes` component that maps the list of heroes and returns the list items.

```JSX
renderHeroes(heroes)
{
    return heroes.map((hero) =>
    {
        return (
            <li key={hero.id}>
                <span>{hero.id}</span> {hero.name}
            </li>
        );
    });
}
```
Note that we have a `key` on our list item that is assigned to the value of the hero's id. Whenever we create a list of elements we need to assign a key to help React keep track of which element has changed. Keys should be a unique identifier among siblings. The array index can be used as a last resort as long as the order of items will not change. Generally you only need to assign a key to elements that are created within a `map()` call.

## Styling our heroes
Next we will add styles to our heroes list using CSS modules. CSS modules are a feature that allows us to scope our CSS for each component without worrying about CSS class names clashing accross our app. You can learn more about CSS modules [here](https://css-tricks.com/css-modules-part-1-need/).

Create a `Heroes.module.css` file in the `src/app/heroes` folder. Add the following code:
```CSS
/* Heroes component private CSS styles */
.Heroes
{
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
}
.Heroes li
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
.Heroes li:hover
{
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
}
li.selected
{
    background-color: #CFD8DC;
    color: white;
}
li.selected:hover
{
    background-color: #BBD8DC;
    color: white;
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

Import our styles in the `Heroes` component.
```JSX
import styles from "./Heroes.module.css";
```

This creates a reference to the styles as a JavaScript object. Next lets add our styles to the elements. Add `className={styles.Heroes}` to the `<ul>` tag and `className={styles.badge}` to the `<span>` around the hero id in the `<li>`;
```JSX
renderHeroes(heroes)
{
    return heroes.map((hero) =>
    {
        return (
            <li key={hero.id}>
                <span className={styles.badge}>{hero.id}</span> {hero.name}
            </li>
        );
    });
}

render()
{
    return  (
        <div>
            <h2>My Heroes</h2>
            <ul className={styles.Heroes}>
                {this.renderHeroes(this.props.heroes)}
            </ul>
            <h2>{this.state.hero.name.toUpperCase()} Details</h2>
            <div>
                <span>id: </span>{this.state.hero.id}
            </div>
            <div>
                <label>
                    name:
                    <input value={this.state.hero.name} onChange={(e) => this.handleChange(e)}placeholder="name"></input>
                </label>
            </div>
        </div>
    );
}
```

## Master/Detail View
Clicking on a hero in the master list should show the selected hero's details at the bottom of the page. We will add a click event handler and update the hero details.

### Click event handler
When the user selects a hero, the state needs to update with the selected hero. We will now add a `handleClick()` method that takes the selected hero and updates the state.
```JSX
handleClick(hero)
{
    this.setState({hero: hero});
}
```

### Binding onClick
Add the click event binding to the `<li>`.
```JSX
<li key={hero.id} onClick={() => this.handleClick(hero)}>
```

### Hiding empty details
Now that we are able to select heroes, let's remove the default hero. Change the default hero in the `constructor` to `null`.
```JSX
constructor(props)
{
    super(props);
    this.state = { hero: null };
}
```

The app breaks becuase we no long have a hero to render for the details. We can conditionally render components in React using JavaScript operators like `if` or the conditional (ternary) operator. First we will wrap the details in a new `<div>`. Then we will use the logical `&&` to render the details only when a hero is selected. Update the view to:
```JSX
render()
{
    return  (
        <div>
            <h2>My Heroes</h2>
            <ul className={styles.Heroes}>
                {this.renderHeroes(this.props.heroes)}
            </ul>
            {this.state.hero &&
                <div>
                    <h2>{this.state.hero.name.toUpperCase()} Details</h2>
                    <div>
                        <span>id: </span>{this.state.hero.id}
                    </div>
                    <div>
                        <label>
                            name:
                            <input value={this.state.hero.name} onChange={(e) => this.handleChange(e} placeholder="name"></input>
                        </label>
                    </div>
                </div>
            }
        </div>
    );
}
```

### Style selected hero
The list currently doesn't indicate which hero is selected. Let's add some styles for the selected hero now. Modify the `<li>` to the following:
```JSX
<li key={hero.id} className={this.state.hero && this.state.hero.id === hero.id ? styles.selected : ""} onClick={() => this.handleClick(hero)}>
```

## Final code review

### `src/App.js`
```JSX
import React from "react";

import {Heroes} from "./heroes/Heroes";

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
        <div>
            <h1>{title}</h1>
            <Heroes heroes={heroes}></Heroes>
        </div>
    );
}

export default App;
```

### `src/heroes/Heroes.js`
```JSX
import React, {Component} from "react";

import styles from "./Heroes.module.css";

export class Heroes extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { hero: null };
    }

    renderHeroes(heroes)
    {
        return heroes.map((hero) =>
        {
            return (
                <li key={hero.id} className={this.state.hero && this.state.hero.id === hero.id ? styles.selected : ""} onClick={() => this.handleClick(hero)}>
                    <span className={styles.badge}>{hero.id}</span> {hero.name}
                </li>
            );
        });
    }

    handleChange({target})
    {
        this.setState((state, props) =>
        {
            return {hero: {name: target.value, id: state.hero.id}}
        });
    }

    handleClick(hero)
    {
        this.setState({hero: hero});
    }

    render()
    {
        return  (
            <div>
                <h2>My Heroes</h2>
                <ul className={styles.Heroes}>
                    {this.renderHeroes(this.props.heroes)}
                </ul>
                {this.state.hero &&
                    <div>
                        <h2>{this.state.hero.name.toUpperCase()} Details</h2>
                        <div>
                            <span>id: </span>{this.state.hero.id}
                        </div>
                        <div>
                            <label>
                                name:
                                <input value={this.state.hero.name} onChange={(e) => this.handleChange(e)} placeholder="name"></input>
                            </label>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
```

### `src/heroes/Heroes.module.css`
```CSS
/* Heroes component private CSS styles */
.Heroes
{
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
}
.Heroes li
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
.Heroes li:hover
{
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
}
li.selected
{
    background-color: #CFD8DC;
    color: white;
}
li.selected:hover
{
    background-color: #BBD8DC;
    color: white;
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
- You learned how to create and display a list of heroes.
- You adde a CSS module to the `Heroes` component.
- You learned how to update the details when a user selects a hero.
- You learned how to conditionally render the hero details.

[Next Steps: Part 3 - Separating Features](3-separating-features.md)
