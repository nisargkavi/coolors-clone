"use client";
import React,{useState,useEffect,useContext} from "react";
import generateHex from "@/app/generate/page";

const AppContext = React.createContext();

const AppProvider = ({children}) => {

    // const [randomColorPalette,setRandomColorPalette] = useState(generateHex());
    const [windowSize, setWindowSize] = useState({
        width: 1920,
        height: 1920,
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
      
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <AppContext.Provider 
        value={{
            windowSize
        }}>
            {children}
        </AppContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(AppContext);
};
  
export { AppContext, AppProvider };