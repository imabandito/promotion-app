import { useState, createContext, ReactElement, useEffect } from 'react';
import { ITheme, themes } from '../configs/themes';

const Themes = ['light', 'dark'] as const;
type Themes = (typeof Themes)[number];

type ThemeContextType = {
  themeName: Themes;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  themeName: 'light',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactElement | ReactElement[];
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeName, setThemeName] = useState<Themes>('dark');
  const [theme, setTheme] = useState<ITheme>(themes.dark);

  const toggleTheme = () => {
    if (theme === themes.dark) {
      setTheme(themes.light);
      setThemeName('light');
    } else {
      setTheme(themes.dark);
      setThemeName('dark');
    }
  };

  useEffect(() => {
    const name = localStorage.getItem('theme') as Themes;
    if (Themes.includes(name)) {
      setTheme(themes[name]);
      setThemeName(name);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', themeName);
    Object.entries(theme).forEach(([key, value]: Array<string>) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
