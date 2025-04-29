import React, { useState, useEffect } from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import { NavLink, useLocation } from "react-router-dom";
import { BsChatDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import usr from "/src/assets/img/adewumi.png";
import Profilelink from "../components/Profilelink";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dashboardTitle, setDashboardTitle] = useState("welcome");
  const [isuser, setUser] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) navigate("/");
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    const path = location.pathname;
    const routeMap = {
      "/dashboard": "Dashboard",
      "/ticket": "Ticket",
      "/chat": "Chat",
      "/newticket": "New Ticket",
      "/soilphlevel": "Soil PH Level",
      "/Userprofile": "User Profile",
      "/Settings": "Settings",
      "/Theme": "Theme",
      "/Help": "Help",
      "/history": "History",
      "/About": "About",
      "/": "Logout",
      "/humidity": "Humidity",
      "/nutrientlevel": "Nutrient Level",
      "/plants": "Plants",
    };

    setDashboardTitle(path.startsWith("/plants/") ? "Plant Details" : routeMap[path] || "Welcome");
  }, [location]);

  const handleUserClick = () => {
    setShowUser((previous) => !previous);
  };

  const handleDashboardTitleUpdate = (title) => {
    setDashboardTitle(title);
  };

  return (
    <div className='black-transaparent h-full flex'>
      <div className='nav-options'>
        <div className='user-pics '>
          <button className='profile-user' onClick={handleUserClick}>
            {/* {usr} */}
            {usr ? (
              <div className='user-initials  text-bolder text-[var(--primary-color)] text-xl'>
                {isuser?.displayName
                  ? isuser.displayName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .toUpperCase()
                  : "U"}
              </div>
            ) : (
              <img src='' alt='User' className='user-image' />
            )}

            <AnimatePresence>
              {showUser && (
                <motion.div
                  className='opt fixed'
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                >
                  <Profilelink setDashboardTitle={handleDashboardTitleUpdate} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
        <div className='new-ticket-button'>
          <NavLink
            to='/newticket'
            className='rounded-3xl h-6 w-4/6 flex justify-center items-center bt-p-color font-bold newt'
            activeClassName='mess'
            exact
          >
            <span className='plus mr-2 flex justify-center items-center'>
              <p>
                <FaPlus className=' text-xs' />
              </p>
            </span>
            <p>New</p>
          </NavLink>
        </div>
        <div className='nav-links flex flex-col justify-center items-center w-full gap-4'>
          <NavLink
            to='/dashboard'
            className='flex p2p flex-row hover:text-sm text-xs text-slate-500 hover:text-white pl-4 h-5  text-left w-full'
            activeClassName='active'
            exact
          >
            <DashboardOutlinedIcon className='icon3w mr-2' />
            <p>Dashboard </p>
          </NavLink>
          {/* <NavLink
            to="/soilphlevel"
            className="flex p2p flex-row hover:text-sm text-xs text-slate-500 hover:text-white pl-4 h-5  text-left w-full"
            activeClassName="active"
            exact
          >
            <DashboardOutlinedIcon className="icon3w mr-2" />
            <p>Soilphlevel</p>
          </NavLink> */}
          {/* <  */}
          <NavLink
            to='/plants'
            className='flex p2p flex-row hover:text-sm text-xs text-slate-500 hover:text-white h-5 pl-4  text-left w-full'
            activeClassName='active'
            exact
          >
            <YardOutlinedIcon className='icon3w mr-2 font-bold' />
            <p>Plants</p>
          </NavLink>
          <NavLink
            to='/chat'
            className='flex p2p flex-row hover:text-sm text-xs text-slate-500 hover:text-white h-5 pl-4  text-left w-full'
            activeClassName='active'
            exact
          >
            <BsChatDots className='icon3w mr-2 font-bold' />
            <p>message</p>
          </NavLink>
        </div>
      </div>
      <div className='title'>{dashboardTitle}</div>
    </div>
  );
};

export default Navbar;
