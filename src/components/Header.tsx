import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { authenticateFirebase } from "../firebase.config";

const Header = () => {
  const [nav, setNav] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    signOut(authenticateFirebase()).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    setNav(false);
  }, [pathname]);

  return (
    <header className="mx-auto p-2 flex justify-between bg-green-200 h-16  items-center max-w-[1240px] md:my-4 sm:rounded-b-xl md:rounded-xl shadow-md shadow-green-500/50">
      <div className="flex space-x-3 items-center ml-2 md:ml-12">
        <img src={logo} />
        <h1 className="font-bold text-2xl">Elderly Care</h1>
      </div>
      <nav>
        <ul className="hidden md:flex space-x-6 font-semibold mr-4 text-lg">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          {!!userId && (
            <li>
              <NavLink to="/details">Personal Details</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/assistance">Assistance</NavLink>
          </li>
          <li>
            <NavLink to="/cost">Cost</NavLink>
          </li>
          <li>
            <NavLink to="/startNow">Request Now</NavLink>
          </li>
          {userId && (
            <li>
              <NavLink to="/" onClick={handleLogout}>
                Sign Out
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineClose size={30} className="mr-4" />
        ) : (
          <AiOutlineMenu size={30} className="mr-4" />
        )}
      </div>

      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-green-300 bg-green-200 ease-in-out duration-500 z-30"
            : "fixed left-[-100%] ease-in-out duration-500"
        }
      >
        <div className="flex space-x-3 items-center ml-2 mt-5 md:ml-12 md:mt-0">
          <img src={logo} />
          <h1 className="font-bold text-xl">Elderly Care</h1>
        </div>
        <nav className="sm: block md:hidden">
          <ul className="px-6 pt-10 flex flex-col space-y-8 font-semibold">
            <li className="border-b border-green-700 pb-4">
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li className="border-b border-green-700 pb-4">
              <NavLink to="/details">Personal Details</NavLink>
            </li>
            <li className="border-b border-green-700 pb-4">
              <NavLink to="/assistance">Assistance</NavLink>
            </li>
            <li className="border-b border-green-700 pb-4">
              <NavLink to="/cost">Cost</NavLink>
            </li>
            <li className="border-b border-green-700 pb-4">
              <NavLink to="/startNow">Request Now</NavLink>
            </li>
            {userId && (
              <li>
                <NavLink
                  to="/"
                  onClick={handleLogout}
                  className={({ isActive }) =>
                    isActive ? "text-[green-500]" : undefined
                  }
                >
                  Sign Out
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
