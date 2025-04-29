import React from "react";
import Navbar from "./Navbar";

const MasterLayout = ({ children }) => {
  return (
    <>
      <div className='home bg-linear flex items-center h-screen overflow-hidden relative'>
        <Navbar />
        <div className='top h-screen w-36'></div>
        <div className='other w-full h-full z-10'>
          <div className='nav-top h-20'></div>
          <div className='main h-full w-full'>{children}</div>
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
