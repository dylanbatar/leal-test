import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import AccountPage from "./Pages/Account/AccountPage";
import HomePage from "./Pages/Home/HomePage";
import { ThemeProvider } from "./Providers/ThemeProvider";
import { PublicRoutes } from "./Routes/Routes";
import { store } from "./Store/store";

function App() {
  return (
    <Suspense fallback={<>Cargando...</>}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <div className="bg-white dark:bg-[#ffcc00] transition-all">
              <main>
                <div className=" w-full ">
                  <Navbar />
                </div>
                <div className="min-h-screen flex justify-center items-center">
                  <Routes>
                    <Route path="/" element={<Navigate to={PublicRoutes.HOME} />} />
                    <Route path="/Home" element={<HomePage />} />

                    <Route path="/Account" element={<AccountPage />} />
                  </Routes>
                </div>
              </main>
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
}

export default App;
