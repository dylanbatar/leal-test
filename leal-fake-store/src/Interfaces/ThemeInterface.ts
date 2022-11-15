export interface ThemeInterface {
  initialTheme?: string;
  children: JSX.Element[] | JSX.Element;
}

export interface ThemeContextType {
  theme: string;
  setTheme: (value: string) => void;
}
