import { Link } from "react-router-dom";
import { PublicRoutes } from "../../Routes/Routes";
import { ToggleDarkMode } from "../Toggles/ToggleDarkMode";

export const Navbar = () => {
  return (
    <header className="text-gray-700 bg-white dark:bg-[#ffcc00] body-font drop-shadow-xl ">
      <div className="flex-row  flex lg:mx-24  flex-wrap p-5 mx-auto md:items-center md:flex-row justify-between">
        <div className="flex">
          <nav className="flex flex-wrap items-center justify-center ml-4 text-base">
            <Link
              to={`/${PublicRoutes.HOME}`}
              className="mr-5 text-sm font-semibold text-gray-700 dark:text-white rounded-xl hover:text-gray-800"
            >
              Home
            </Link>

            <Link
              className="mr-5 text-sm font-semibold text-gray-700 dark:text-white rounded-xl hover:text-gray-800"
              to={`/${PublicRoutes.ACCOUNT}`}
            >
              Account
            </Link>
          </nav>
        </div>
        <div>
          <ToggleDarkMode />
        </div>
      </div>
    </header>
  );
};
