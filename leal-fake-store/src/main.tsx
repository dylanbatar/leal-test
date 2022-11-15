import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Navbar } from "./Components/Navbar/Navbar";
import "./index.css";
import { ThemeProvider } from "./Providers/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    {/* <ThemeProvider>
      <div className="bg-white dark:bg-black transition-all">
        <main>
          <div className="absolute w-full right-0 top-0">
            <Navbar />
          </div>
          <App />
        </main>
      </div>
    </ThemeProvider> */}
  </React.StrictMode>
);
