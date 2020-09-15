# Separating Application Features
In this section, we are going to refactor the `Heroes` component. The `Heroes` component currently displays the list of heroes and the hero details in a single component. As components grow they become harder to maintain and reuse. We want to split the details into a smaller, more focused `HeroDetail` component, and extract the hero list into a new `HeroesList` component as well.

To see the sample app from this section clone the repository
```
git clone https://github.com/DominicCrisafi/react-tour-of-heroes.git toh-part3-feature
```

## Creating the HeroDetail component
Create a new file in the `src/heroes` folder named `HeroDetail.js` then `import` React.

### Function components
We will be creating a function component instead of the class components we used previously. Function components are JavaScript functions that accepts a single `props` object and returns a React element to render. Create a function named `HeroDetail` that takes a `props` parameter and `export` it.

```JSX
import React from "react";

export const HeroDetail = (props) =>
{

}
```

### Extract the detail view
Remove the hero detail view from the `Hero` component and return it from the new `HeroDetail` component.
Change `this.state` to `props` everywhere in the view and replace the `onChange` event handler with `props.handleChange`. We will pass the selected hero and a change handler from the parent component.
```JSX
export const HeroDetail = (props) =>
{
    return (
        <div>
            <h2>{props.hero.name.toUpperCase()} Details</h2>
            <div>
                <span>id: </span>{props.hero.id}
            </div>
            <div>
                <label>
                    name:
                    <input value={props.hero.name} onChange={props.handleChange} placeholder="name"></input>
                </label>
            </div>
        </div>
    );
}
```

## Creating the HeroesList component
Create another new file in the `src/heroes` folder named `HeroesList.js` and `export` a `HeroesDetail` function component.

```JSX
import React from "react";

export const HeroesList = (props) =>
{

}
```

Move the view from `Heroes` into the new component.
```JSX
export const HeroesList = (props) =>
{
    return (
        <div>
            <h2>My Heroes</h2>
            <ul className={styles.Heroes}>
                {this.renderHeroes(this.props.heroes)}
            </ul>
        </div>
    );
}
```

Rename the `Heroes` module css file to `HeroesList.module.css`. Update the `.Heroes` css class to `.HeroesDetails` and move the import into the new `HeroesList` file.
```JSX
import React from "react";

import styles from "./HeroesList.module.css";

export const HeroesList = (props) =>
{
    return (
        <div>
            <h2>My Heroes</h2>
            <ul className={styles.HeroesList}>
                {this.renderHeroes(this.props.heroes)}
            </ul>
        </div>
    );
}
```
```CSS
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
```

Move the `heroes.map` call from `Heroes` component, and assign it to a `const` named `heroes`. Change it to map the heroes from `props`. Remove the `renderHeroes()` method from the `Heroes` component.

```JSX
export const HeroesList = (props) =>
{
    const heroes = props.heroes.map((hero) =>
    {
        return (
            <li key={hero.id} className={this.state.hero && this.state.hero.id === hero.id ? styles.selected : ""} onClick={() => this.handleClick(hero)}>
                <span className={styles.badge}>{hero.id}</span> {hero.name}
            </li>
        );
    });

    return (
        <div>
            <h2>My Heroes</h2>
            <ul className={styles.HeroesList}>
                {this.renderHeroes(this.props.heroes)}
            </ul>
        </div>
    );
}
```

Replace `{this.renderHeroes(this.props.heroes)}` with `{heroes}`.
```JSX
export const HeroesList = (props) =>
{
    const heroes = props.heroes.map((hero) =>
    {
        return (
            <li key={hero.id} className={this.state.hero && this.state.hero.id === hero.id ? styles.selected : ""} onClick={() => this.handleClick(hero)}>
                <span className={styles.badge}>{hero.id}</span> {hero.name}
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

Change `this.handleClick` to `props.handleClick` and modify the class name on the `<li>` to check `props.selectedHeroId`.
```JSX
const heroes = props.heroes.map((hero) =>
{
    return (
        <li key={hero.id} className={props.selectedHeroId === hero.id ? styles.selected : ""} onClick={() => props.handleClick(hero)}>
            <span className={styles.badge}>{hero.id}</span> {hero.name}
        </li>
    );
});
```

## Showing the new components
Now we need to `import` and display the new `HeroDetail` and `HeroesList` components in place of the view that we removed.

### HeroDetail component
`import` the `HeroDetail` component in the `Hero` component and add a `<HeroDetail>` tag where the details used to be. Pass the current hero from the state to the `hero` prop and `(e) => this.handleChange(e)` to the `handleChange` prop. The updated `Heroes` component view should now look like this:
```JSX
render()
{
    return  (
        <div>

            {this.state.hero &&
                <HeroDetail hero={this.state.hero} handleChange={(e) => this.handleChange(e)}><HeroDetail>
            }
        </div>
    );
}
```

### HeroesList component
`import` the `HeroesList` component in the `Hero` component and add a `<HeroesList>` tag where the list used to be. Pass the list of heroes from `props`, the current hero's id from `state`, and `handleClick` callback.
```JSX
render()
{
    return  (
        <div>
            <HeroesList heroes={this.props.heroes} selectedHeroId={this.state.hero?.id} handleClick={(hero) => this.handleClick(hero)}></HeroesList>
            {this.state.hero &&
                <HeroDetail hero={this.state.hero} handleChange={(e) => this.handleChange(e)}></HeroDetail>
            }
        </div>
    );
}
```

## Converting a class component to function component
Now that the list and detail views have been extracted it's time to convert `Heroes` component to a function. Start by changing the class definition to a function and return the view that was returned by the `render()` method. Remove all references to `this`.
```JSX
export const Heroes = (props) =>
{
    return (
        <div>
            <HeroesList heroes={props.heroes} selectedHeroId={state.hero?.id} handleClick={(hero) => handleClick(hero)}></HeroesList>
            {state.hero &&
                <HeroDetail hero={state.hero} handleChange={(e) => handleChange(e)}></HeroDetail>
            }
        </div>
    );
};
```

Next, move the `handleChange()` and `handleClick` into the body of `Heroes`.
```JSX
export const Heroes = (props) =>
{
    const handleChange = ({target}) =>
    {
        setState((state, props) =>
        {
            return {hero: {name: target.value, id: state.hero.id}};
        });
    };
    const handleClick = (hero) =>
    {
        setState({hero: hero});
    };

    return (
        <div>
            <HeroesList heroes={props.heroes} selectedHeroId={state.hero?.id} handleClick={(hero) => handleClick(hero)}></HeroesList>
            {state.hero &&
                <HeroDetail hero={state.hero} handleChange={(e) => handleChange(e)}></HeroDetail>
            }
        </div>
    );
};
```

### Handling state in function components
The `Heroes` component needs to be able to manage state, but function components do not have a `setState()` method like class components do. In order to save state from a function component, we need to use React hooks. Hooks are special functions that let function components hook into React features like state.

## useState hook
Add `useState` to your `import` and then create add `const [currentHero, setCurrentHero] = useState(null)` to the top of your function component.
```JSX
import React, {useState} from "react";

import {HeroDetail} from "./HeroDetail";
import {HeroesList} from "./HeroesList"

export const Heroes = (props) =>
{
    const [currentHero, setCurrentHero] = useState(null);
    const handleChange = ({target}) =>
    {
        setState((state, props) =>
        {
            return {hero: {name: target.value, id: state.hero.id}}
        });
    };
    const handleClick = (hero) =>
    {
        setState({hero: hero});
    };

    return (
        <div>
            <HeroesList heroes={props.heroes} selectedHeroId={state.hero?.id} handleClick={(hero) => handleClick(hero)}></HeroesList>
            {state.hero &&
                <HeroDetail hero={state.hero} handleChange={(e) => handleChange(e)}></HeroDetail>
            }
        </div>
    );
};
```
`useState` creates a state variable and take the initial state as the only argument. It returns the current state and a function to update the state in an array.

Now that we have a function to set state again, we will update the event handlers. Update the handlers to the following:
```JSX
const handleChange = ({target}) =>
{
    setCurrentHero({name: target.value, id: currentHero.id});
};
const handleClick = (hero) =>
{
    setCurrentHero(hero);
};
```

Then update the view to use the new state.
```JSX
return (
    <div>
        <HeroesList heroes={props.heroes} selectedHeroId={currentHero?.id} handleClick={(hero) => handleClick(hero)}></HeroesList>
        {currentHero &&
            <HeroDetail hero={currentHero} handleChange={(e) => handleChange(e)}></HeroDetail>
        }
    </div>
);
```

## Final result
The app should function the same as before. Clicking on a hero shows the details. The `HeroDetail` component is now responsible for displaying the details, and the `HeroesList` component handles the list of heroes. `Heroes` is now a container component responsible for providing the data to it's children and handling the events from the details and list views. This lets us reuse or make changes to `HeroDetail` and `HeroesList` without touching the other.

## Final code review
Here are the final code files.

### `src/heroes/Heroes.js`
```JSX
import React, {useState} from "react";

import {HeroDetail} from "./HeroDetail";
import {HeroesList} from "./HeroesList"

export const Heroes = (props) =>
{
    const [currentHero, setCurrentHero] = useState(null);
    const handleChange = ({target}) =>
    {
        setCurrentHero({name: target.value, id: currentHero.id});
    };
    const handleClick = (hero) =>
    {
        setCurrentHero(hero);
    };

    return (
        <div>
            <HeroesList heroes={props.heroes} selectedHeroId={currentHero?.id} handleClick={(hero) => handleClick(hero)}></HeroesList>
            {currentHero &&
                <HeroDetail hero={currentHero} handleChange={(e) => handleChange(e)}></HeroDetail>
            }
        </div>
    );
};
```

### `src/heroes/HeroDetails.js`
```JSX
import React from "react";

export const HeroDetail = (props) =>
{
    return (
        <div>
            <h2>{props.hero.name.toUpperCase()} Details</h2>
            <div>
                <span>id: </span>{props.hero.id}
            </div>
            <div>
                <label>
                    name:
                    <input value={props.hero.name} onChange={props.handleChange} placeholder="name"></input>
                </label>
            </div>
        </div>
    );
}
```

### `src/heroes/HeroesList.js`
```JSX
import React from "react";

import styles from "./HeroesList.module.css";

export const HeroesList = (props) =>
{
    const heroes = props.heroes.map((hero) =>
    {
        return (
            <li key={hero.id} className={props.selectedHeroId === hero.id ? styles.selected : ""} onClick={() => props.handleClick(hero)}>
                <span className={styles.badge}>{hero.id}</span> {hero.name}
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
- You learned how to create function components.
- You learned how to convert a class component to a function component.
- You used the `useState` React hook to add state to a function component.
- You extracted the hero details and hero list into smaller, more maintainable components.

[Next Steps: Part 4 - Add In-app Navigation](4-routing.md)
