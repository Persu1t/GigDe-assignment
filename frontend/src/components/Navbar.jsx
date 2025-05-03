import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import DropDown from "./DropDown";
const Navbar = () => {
  const user = useSelector((state) => state.authReducer);
  return (
    <>
      <nav className="bg-[#000957] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#FFEB00]">TaskTracker</h1>

          <ul className="flex space-x-6 font-medium">
            <li>
              <Link to="/" className="hover:text-[#FFEB00]">
                Home
              </Link>
            </li>
            {user.currentUser === null ? (
              <>
                {" "}
                <li>
                  <Link to="/login" className="hover:text-[#FFEB00]">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-[#FFEB00]">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <DropDown />
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
