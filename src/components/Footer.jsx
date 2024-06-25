import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-center bg-slate-800 text-white py-3">
      <div className="text-xl font-bold pb-2">
        <span className="text-green-600 text-base">&lt;Pass</span>Protector 
        <span className="text-green-600 text-base">/&gt;</span>
      </div>
      <div className="font-semibold md:text-sm text-[11px]">
        Created By{" "}
        <span className="text-sm text-green-700 font-bold">Abdul Rafay ❤️</span>{" "}
        | {new Date().getFullYear()} all copyright reserved.
      </div>
    </footer>
  );
};

export default Footer;
