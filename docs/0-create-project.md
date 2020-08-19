# Create a new project
We will begin by creating the initial application using [Create React App](https://reactjs.org/docs/create-a-new-react-app). We will be modifying this starter application throughout the workshop to create the Tour of Heroes app.

In this section you will learn how to:
1. Set up your development environment.
2. Create an initial React app.
3. Run the application.
4. Make changes to the application.

To see the sample app from this section clone the repository
```
git clone https://github.com/DominicCrisafi/react-tour-of-heroes.git toh-part0-create-project
```

## Set up your environment
Install a recent version of [Node.JS](https://nodejs.org) then run the following command in a terminal to verify that the installation was completed succesfully:
```
node -v
```

## Create the initial application
[Create React App](https://reactjs.org/docs/create-a-new-react-app) is used to quickly create starter React applications. It creates a simple starter project and installs the necessary React npm packages and dependencies.

To create the initial project run:
```
npx create-react-app react-tour-of-heroes
```

## Start the application
Navigate to the root of your project directory and start the application.
```
cd react-tour-of-heroes
npm start
```

After a few moments the application should open in the browser. If not, open http://localhost:3000/ in the browser to view the application.

The application runs in development mode and will automatically rebuild and refresh the page when you make changes to the code. Build errors and lint warning will be shown in the console.

## React components
The page you see is controlled by a React component named `App`. Components are small, isolated pieces of code that can be composed to create complex UIs and are the building blocks of React applications.

## Modifying the application
Open the project in your prefered editor or IDE and navigate to the `src` folder. The App component is implemented in `App.js`, while the component styles are in `App.css`.

### Change the application title
Open the component file (`App.js`) and remove the body of the `App` function, and the logo import. Create a variable named `title` and set it to 'Tour of Heroes';

```JavaScript
const title = "Tour of Heroes";
```

Create a return statement with the following:

```JSX
return (
    <div>
        <h1>{Title}</h1>
    </div>
);
```
The XML-Like tags are JSX, which is a syntax extension to JavaScript. JSX is used with React to describe what the UI should look like and is transformed into regular JavaScript function calls and objects after compilation. The curly braces allow us to embed any valid JavaScript expressions in JSX.

### Modify application styles
The project allows us to import styles on a per Component basis. We will putting application-wide styles in `index.css` for this project.

Open `src/index.css` and replace the contents with the code below.

```CSS
/* Application-wide Styles */
h1
{
    color: #369;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 250%;
}
h2, h3
{
    color: #444;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
}
body
{
    margin: 2em;
}
body, input[type="text"], button
{
    color: #333;
    font-family: Cambria, Georgia;
}

/* everywhere else */
*
{
    font-family: Arial, Helvetica, sans-serif;
}
```

Delete `src/App.css`, and remove the import from `src/App.js`.

## Final code review
Here are the final code files.

### `src/App.js`
```JSX
import React from "react";

function App()
{
    const title = "Tour of Heroes";

    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
}

export default App;
```

### `src/index.css`
```CSS
/* Application-wide Styles */
h1
{
    color: #369;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 250%;
}
h2, h3
{
    color: #444;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
}
body
{
    margin: 2em;
}
body, input[type="text"], button
{
    color: #333;
    font-family: Cambria, Georgia;
}

/* everywhere else */
*
{
    font-family: Arial, Helvetica, sans-serif;
}
```

## Summary
- You created the initial application using Create React App.
- You learned that React components make up the view.
- You used JSX and curly braces to display the app title.

[Next Steps: The Hero Editor](1-the-hero-editor.md)
