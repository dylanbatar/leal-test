import { createContext } from "react";
import { ThemeContextType } from "../Interfaces/ThemeInterface";

export const ThemeContext = createContext<ThemeContextType>({ theme: "", setTheme: () => {} });
