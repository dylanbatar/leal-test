export interface ITheme {
  initialTheme?: string;
  children: JSX.Element[] | JSX.Element;
}

export interface IThemeContextType {
  theme: string;
  setTheme: (value: string) => void;
}
