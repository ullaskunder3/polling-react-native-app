import React, { useState, createContext, useEffect } from "react";
import { Appearance } from "react-native";

const DictionaryContext = createContext<any|null>(null);

const DictionaryContextProvider = ({children}:any)=>{
    const [dictionaryData, setDictionaryData] = useState([])
    const [theme, setTheme] = useState('');
    
    return(
        <DictionaryContext.Provider value={{dictionaryData, setDictionaryData}}>
            {children}
        </DictionaryContext.Provider>
    )
};

export {DictionaryContext, DictionaryContextProvider}