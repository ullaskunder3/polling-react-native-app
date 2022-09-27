import React, { useState, createContext, useEffect } from "react";
import { Appearance } from "react-native";

const AppContext = createContext<any|null>(null);

const AppContextProvider = ({children}:any)=>{
    const [AppData, setAppData] = useState([])
    
    return(
        <AppContext.Provider value={{AppData, setAppData}}>
            {children}
        </AppContext.Provider>
    )
};

export {AppContext, AppContextProvider}