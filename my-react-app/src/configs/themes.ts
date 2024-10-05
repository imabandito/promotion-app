export interface ITheme {
  primary: string;
  black: string;
  white: string;
  title: string;
  secondaryTextColor: string;
  inactive: string;
  divider: string;
  background: string;
  backgroundLight: string;
  dropdown: string;
  header: string;
  status: string;
  grey: string;
  dropdownHover: string;
  paragraph: string;
  titleLight: string;
}

interface IThemes {
  dark: ITheme;
  light: ITheme;
}

export const themes: IThemes = {
  dark: {
    primary: '#4C6FFF',
    black: '#FFFFFF',
    white: '#1A1E2C',
    title: '#FFFFFF',
    secondaryTextColor: '#A0AEC0',
    inactive: '#6F7C8B',
    divider: '#2D3748',
    background: '#1e1e1e',
    backgroundLight: '#2e2e2e',
    dropdown: '#4A5568',
    header: '#2C5282',
    status: '#63B3ED',
    grey: '#718096', 
    dropdownHover: '#434343', 
    paragraph: '#E2E8F0',
    titleLight: '#CBD5E080', 
  },
  light: {
    primary: '#4C6FFF',
    black: '#1A1E2C',
    white: '#FFFFFF',
    title: '#1A1E2C',
    secondaryTextColor: '#6F7C8B',
    inactive: '#806F7C8B',
    divider: '#EAEDF3',
    background: '#F5F6F7',
    backgroundLight: "#FFFFFF",
    dropdown: '#8E94A7',
    header: '#040D32',
    status: '#2E5BFF',
    grey: '#9D9D9D',
    dropdownHover: '#F4F6FF',
    paragraph: '#374A59',
    titleLight: '#6F7C8B80',
  },
};
