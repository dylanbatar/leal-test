import { createContext } from "react";
import { IThemeContextType } from "../Interfaces/ThemeInterface";

export const ThemeContext = createContext<IThemeContextType>({ theme: "", setTheme: () => {} });
