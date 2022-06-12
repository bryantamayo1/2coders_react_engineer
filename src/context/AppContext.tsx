import { createContext, useState }  from "react";
import { ThemeApp }                 from "../interfaces/MoviesInterface.d";

type AppContextProps = {
    changeTheme: () => void,
    theme: ThemeApp
}
type AppProviderProps = {
    children: React.ReactNode
}
const AppProviderInitialStateDark:ThemeApp = {
    color: "#FFF",
    backgroundColor: "#000",
    theme: "dark"
}
const AppProviderInitialStateLight:ThemeApp = {
    color: "#000",
    backgroundColor: "#FFF",
    theme: "light"
}

export const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({ children }: AppProviderProps ) => {
    // Hooks
    const [theme, setTheme] = useState(AppProviderInitialStateDark);

    const changeTheme = () => {
        setTheme(prev => prev.color === "#FFF"? AppProviderInitialStateLight : AppProviderInitialStateDark);
    }

    return(
        <AppContext.Provider value={{
            changeTheme,
            theme
        }}>
            {children}
        </AppContext.Provider>
    );

}