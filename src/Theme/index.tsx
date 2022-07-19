import { useContext, useState } from 'react';
import { ThemeContext, ThemeProvider } from 'styled-components';
import { ResetCSS } from './resetCSS';
// import localStorage from '../localStorage';
import { ThemeMode } from './theme.types';
import ThemeCSS from './themeCSS';
import { light, dark } from './themes';

export const ThemedApp = ({children, mode}: {children: React.ReactNode, mode?: ThemeMode}) => {
    //const mode = localStorage.get('theme')?.mode as ThemeMode;
    const [theme, setTheme] = useState(mode==='light' ? light : dark);

    const dispatchTheme = (newMode: ThemeMode) => {
        //localStorage.set('theme', {mode: mode});
        setTheme(newMode === 'dark' ? dark : light);
    }

    return (
        <ThemeContext.Provider value={{theme, dispatchTheme}} >
            <ThemeProvider theme={theme}>
                <ResetCSS />
                <ThemeCSS />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
        );
};

export const useTheme = (): [ThemeMode, () => void] => {
    const ctx = useContext(ThemeContext);

    const themeToggler = () => (
        ctx.theme.name === 'dark' ? ctx.dispatchTheme('light') : ctx.dispatchTheme('dark')
    );

    return [ctx.theme.name, themeToggler];
};

export default useTheme;