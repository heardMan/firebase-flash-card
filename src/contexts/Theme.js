import { useState, useEffect, createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {

    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        if (theme === 'dark') {
            return setTheme('light')
        }
        return setTheme('dark');
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    return useContext(ThemeContext);
}