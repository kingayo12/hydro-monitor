import React, { useEffect, useState } from "react";
import MasterLayout from "../../Layouts/MasterLayout";
import LoadingAnimation from "../../components/LoadingAnimation";
import user from "/src/assets/img/adewumi.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// import { EditAttributesOutlined, MenuOpenOutlined, ModeEditOutlined, Search } from '@mui/icons-material';
// import data from '../../assets/data/data.json';
// import { FaUser } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import moment from 'moment';
// import SendIcon from '@mui/icons-material/Send';

const Userprofile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userp, setUserp] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserp(currentUser);
      setIsLoading(false); // Set loading to false once auth state is determined
      if (!currentUser) {
        // Redirect to login page if user is not authenticated
        navigate("/"); // Assuming "/" is your login route
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [auth, navigate]);

  return (
    <MasterLayout>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className='user flex w-full h-screen'>
          <div className='userp-cont w-full relative overflow-visible'>
            <div className='userp w-full  overflow-visible'>
              <div className='capitalize text-3xl font-bold text-white text-center animate-pulse mt-3'>
                Welcome
              </div>
              <div className='usr-name uppercase text-center'>
                {userp ? userp.displayName || userp.email : "User"}!
              </div>
              <div className='pics-space'>
                <img src={user} alt='' />
              </div>
            </div>
            <div className='content-usr mt-20 px-4 flex flex-row gap-20'>
              <div className='objec1 bg-red-300 flex-1'>1</div>
              <div className='objec2 bg-blue-500 flex-1'>2asdsdasd</div>
            </div>
            <div className='fl mt-4'>jkadshagsguy</div>
          </div>
        </div>
      )}
    </MasterLayout>
  );
};

export default Userprofile;
