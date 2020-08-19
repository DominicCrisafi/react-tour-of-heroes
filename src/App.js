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
