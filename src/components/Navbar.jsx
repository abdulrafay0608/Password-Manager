import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white h-[60px] flex justify-around items-center ">
      <div className="text-2xl font-bold">
        <span className="text-green-600 text-xl">&lt;Pass</span>Protector
        <span className="text-green-600 text-xl">/&gt;</span>
      </div>
      <ul className="flex justify-center items-center gap-5">
        <li className="">Menu</li>
        {/* <li className="">About</li> */}
        {/* <li className="">Contact</li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
