import { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
  // Colores principales
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  card: string;

  // Texto
  text: string;
  textSecondary: string;
  textMuted: string;

  // Bordes y separadores
  border: string;
  separator: string;

  // Estados
  success: string;
  warning: string;
  error: string;
  info: string;

  // Íconos
  icon: string;
  iconActive: string;
  iconInactive: string;

  // Favoritos
  favorite: string;
  favoriteInactive: string;
}

export interface Theme {
  type: ThemeType;
  colors: ThemeColors;
}

const lightTheme: Theme = {
  type: 'light',
  colors: {
    primary: '#0366d6',
    secondary: '#586069',
    background: '#f6f8fa',
    surface: '#ffffff',
    card: '#ffffff',

    text: '#24292e',
    textSecondary: '#586069',
    textMuted: '#6a737d',

    border: '#e1e4e8',
    separator: '#e1e4e8',

    success: '#28a745',
    warning: '#f6e05e',
    error: '#d73a49',
    info: '#0366d6',

    icon: '#586069',
    iconActive: '#0366d6',
    iconInactive: '#d1d5da',

    favorite: '#f6e05e',
    favoriteInactive: '#d1d5da',
  },
};

const darkTheme: Theme = {
  type: 'dark',
  colors: {
    primary: '#58a6ff',
    secondary: '#8b949e',
    background: '#0d1117',
    surface: '#161b22',
    card: '#21262d',

    text: '#f0f6fc',
    textSecondary: '#8b949e',
    textMuted: '#6e7681',

    border: '#30363d',
    separator: '#30363d',

    success: '#3fb950',
    warning: '#d29922',
    error: '#f85149',
    info: '#58a6ff',

    icon: '#8b949e',
    iconActive: '#58a6ff',
    iconInactive: '#484f58',

    favorite: '#d29922',
    favoriteInactive: '#484f58',
  },
};

interface ThemeContextType {
  theme: Theme;
  themeType: ThemeType;
  toggleTheme: () => void;
  setTheme: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@github_users_theme';

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [themeType, setThemeType] = useState<ThemeType>('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        setThemeType(storedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const saveTheme = async (type: ThemeType) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, type);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = themeType === 'light' ? 'dark' : 'light';
    setThemeType(newTheme);
    saveTheme(newTheme);
  };

  const setTheme = (type: ThemeType) => {
    setThemeType(type);
    saveTheme(type);
  };

  const theme = themeType === 'light' ? lightTheme : darkTheme;

  const value: ThemeContextType = {
    theme,
    themeType,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
