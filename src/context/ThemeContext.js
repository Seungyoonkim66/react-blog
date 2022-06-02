import { createContext } from 'react';

export const ThemeContext = createContext(null);

export const ThemeStyleContext = createContext({
    dark: {
        backgroundColor: 'rgb(78, 78, 78)',
        color: 'rgb(230, 230, 230)',
    },
    light: {
        backgroundColor : 'rgb(255, 255, 255)',
        color: 'rgb(78,78,78)'
    }
});