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
