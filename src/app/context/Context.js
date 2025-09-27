import React, { createContext } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {

    return (
        <Context.Provider value={{
          
        }}>
            {children}
        </Context.Provider>
    );
}
