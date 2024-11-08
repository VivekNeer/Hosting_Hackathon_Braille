import { Link } from "react-router-dom";
import Rubiks from "../assets/squares.json";
import { themeChange } from "theme-change";
import { Player } from "@lottiefiles/react-lottie-player";


import { useEffect } from "react";
// import { TfiAlignJustify } from "react-icons/tfi";

const CustomNavbar = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="navbar bg-base-100 mb-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {/* <TfiAlignJustify /> */}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home </Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {/* Add the theme select button inside the dropdown for small screens */}
            <li>
              <select data-choose-theme className="btn w-full">
              <option value="cupcake">Cupcake</option>
          <option value="business">Business</option>

              </select>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Text To Braille Converter
          <Player autoplay loop src={Rubiks} className="h-12 w-12" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <select data-choose-theme className="btn hidden lg:block">
          <option value="cupcake">Cupcake</option>
          <option value="business">Business</option>
        </select>
      </div>
    </div>
  );
};

export default CustomNavbar;
