import { useState } from "react";
import { MdClose, MdLogout, MdMenu } from "react-icons/md";
import { useUserAuth } from "../../Context/userContext";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Router = useNavigate();
  const { user, Logout } = useUserAuth();
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // Add state for menu

  const handleLogout = () => {
    Logout();
    setShowModal(false);
    Router("/");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="w-full h-16 fixed shadow-light-shadow bg-white">
      <div className="w-full h-full flex justify-between items-center px-5">
        <div className="flex items-center gap-x-4">
          <img src="/assets/MELogo.svg" alt="" className="w-32" />
          <h1 className="hidden md:flex text-xl font-semibold">
            Welcome, {user?.name.split(" ")[0]}
          </h1>
        </div>
        <h1 className="md:hidden text-xl font-semibold">
          Welcome, {user?.name.split(" ")[0]}
        </h1>
        <div className="hidden md:flex justify-between items-center gap-x-5">
          <FaUserCircle size={30} />
          <h1 className="text-lg font-semibold text-gray-600">{user?.email}</h1>
          <button
            className="bg-red-500 text-white px-4 py-2 shadow-lg rounded-md hover:scale-105 transition-all ease-out flex gap-x-2 items-center"
            onClick={() => setShowModal(true)}
          >
            <MdLogout size={30} />
            Logout
          </button>
        </div>
        <div className="md:hidden flex">
          <MdMenu size={30} onClick={toggleMenu} />
        </div>
      </div>
      {/* Logout Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4">
            <h1 className="text-xl font-semibold mb-4">Logout Confirmation</h1>
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 flex gap-x-2 items-center text-white px-4 py-2 rounded-md"
                onClick={handleLogout}
              >
                <MdLogout size={30} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Menu Drawer */}
      {showMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg h-56 w-80">
            <div className="my-4 flex justify-between px-3">
              <h1 className="text-3xl font-semibold  text-center">Menu</h1>
              <MdClose size={30} onClick={toggleMenu} />
            </div>
            <ul className="text-lg p-2 text-center">
              <li>{user?.name}</li>
              <li>{user?.email}</li>

              <div className="mt-3 flex justify-center items-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 shadow-lg rounded-md hover:scale-105 transition-all ease-out flex gap-x-2 items-center"
                  onClick={() => {
                    setShowModal(true);
                    setShowMenu(false);
                  }}
                >
                  <MdLogout size={30} />
                  Logout
                </button>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
