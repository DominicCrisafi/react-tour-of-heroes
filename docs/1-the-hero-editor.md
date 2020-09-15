# The Hero Editor
Now that the application has a basic title, we will create a new component to display hero information and display it in the App component.

To see the sample app from this section clone the repository
```
git clone https://github.com/DominicCrisafi/react-tour-of-heroes.git toh-part1-editor
```

## Create the Heroes component
Create a new folder named `heroes` in the app folder, then create an empty component file named `Heroes.js`. Your project should now look like `src/app/heroes/Heroes.js`.

Add the following code to your Heroes component:
```JSX
import React, {Component} from "react";

export class Heroes extends Component
{
    render()
    {

    }
}
```

You need to always import React when creating components. We are creating a Class component and extending `React.Component`, which requires a `render()` method. The render method returns the elements (typically JSX) that React uses to create the view. We then export the component to be imported and used in other components.

## Passing props to components
Lets start by passing a hero from `App` component to our new `Heroes` component and displaying it.

In the `App` component add a `hero` variable for a hero named "Windstorm", then `import` the newly created `Heroes` component and render it below the app title. Pass a prop called `hero` to the `Heroes` component.
```JSX
import React from "react";

import {Heroes} from "./heroes/Heroes";

function App()
{
    const title = "Tour of Heroes";
    const hero = "Windstorm";

    return (
        <div>
            <h1>{title}</h1>
            <Heroes hero={hero}></Heroes>
        </div>
    );
}

export default App;
```

Now in the `Heroes` component render method a view that displays the hero prop that is passed to the component.
```JSX
export class Heroes extends Component
{
    render()
    {
        return  (
            <div>
                {this.props.hero}
            </div>
        );
    }
}
```

## Setting initial local state
We will move the hero from props and set the components local state instead. Remove the prop and hero from the `App` component. Add a class constructor to the `Heroes` component that initializes `this.state` with a hero. Give the hero an `id` of `1` and the `name` `"Windstorm"`. Then replace `this.props.hero` with `this.state.hero` in the `render()` method.
```JSX
export class Heroes extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            hero:
            {
                id: 1,
                name: "Windstorm"
            }
        };
    }

    render()
    {
        return  (
            <div>
                {this.state.hero}
            </div>
        );
    }
}
```
The app no longer displays the page because we changed hero from a string to an object.

## Showing hero details
Change the view to display a header with the hero's name and show the `id` and `name` in a details layout.
```JSX
render()
{
    return  (
        <div>
            <h2>{this.state.hero.name} Details</h2>
            <div>
                <span>id: </span>{this.state.hero.id}
            </div>
            <div>
                <span>name: </span>{this.state.hero.name}
            </div>
        </div>
    );
}
```

### Format Hero Details
Modify the hero name details header like this:
```JSX
<h2>{this.state.hero.name.toUpperCase()} Details</h2>
```

The hero's name is displayed in capital letters. Becuase of JSX, we are able to use the string method `toUpperCase()` in our embedded JavaScript exrpession.

## Edit the hero
Next we are going to add an `<input>` textbox to allow users to edit the hero name. The `<input>` should display the hero's name and update it as the user types.

Change the hero's name in the details view to look like:
```JSX
render()
{
    return  (
        <div>
            <h2>{this.state.hero.name} Details</h2>
            <div>
                <span>id: </span>{this.state.hero.id}
            </div>
            <div>
                <label>
                    name:
                    <input placeholder="name"></input>
                </label>
            </div>
        </div>
    );
}
```

### Controlled component
We want to keep the form's state in the component state and have the component state be the single source of truth.  In order achieve this we will create a controlled component by binding the `<input>` value to the component state and updating the component state when the `<input>` changes.

First set the `<input>`'s value to the hero's name from state
```JSX
<input value={this.state.hero.name} placeholder="name"></input>
```

Then create a `handleChange()` method and add it to the `<input>`'s `onChange` event.
```JSX
handleChange({target})
{
    this.setState((state, props) =>
    {
        return {hero: {name: target.value, id: state.hero.id}}
    });
}
```
```JSX
<input value={this.state.hero.name} onChange={(e) => this.handleChange(e)} placeholder="name"></input>
```
We need to wrap `handleChange()` in an arrow function when using a class component to make sure the value of `this` is set correctly.

### A note on using `setState()` with `this.state` and `this.props`
`this.state` and `this.props` may be updated asynchronously and should not be relied on when calculating the next state. When you need access to state or props, use the form of `setState()` that accepts a function instead of an object.

## Final code review

### `src/App.js`
```JSX
import React from "react";

import {Heroes} from "./heroes/Heroes";

function App()
{
    const title = "Tour of Heroes";

    return (
        <div>
            <h1>{title}</h1>
            <Heroes></Heroes>
        </div>
    );
}

export default App;
```

### `src/heroes/Heroes.js`
```JSX
import React, {Component} from "react";

export class Heroes extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            hero:
            {
                name: "Windstorm",
                id: 1
            }
        };
    }

    handleChange({target})
    {
        this.setState((state, props) =>
        {
            return {hero: {name: target.value, id: state.hero.id}}
        });
    }

    render()
    {
        return  (
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
        );
    }
}
```

## Summary
- You created a `Heroes` class component.
- You displayed the `Heroes` component by adding it to the `App` component.
- You learned how to use and update component state.
- You learned how to create a controlled component.

[Next Steps: Part 2 - Display a List of Heroes](2-display-hero-list.md)
