import React, {createContext, useState} from "react";

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
