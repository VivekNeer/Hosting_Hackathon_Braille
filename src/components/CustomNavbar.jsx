// import { Link } from "react-router-dom";
// import { TfiAlignJustify } from "react-icons/tfi";
// import Rubiks from "../assets/squares.json";
import { themeChange } from "theme-change";

import {  useEffect } from "react";

const CustomNavbar = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="navbar bg-base-100 mb-4">
      <select data-choose-theme className="btn hidden lg:block">
        <option value="cupcake">Cupcake</option>
        <option value="business">Business</option>
      </select>
    </div>
  );
};

export default CustomNavbar;
