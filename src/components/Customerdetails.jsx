import React from 'react'
import { Person2Outlined } from '@mui/icons-material';
import { NavLink, useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Ticket from '../pages/ticket/Ticket';
import Ticketbox from './ticketbox/Ticketbox';






const Customerdetails = () => {

    // useEffect(() => {
    //     // Update the dashboard title based on the current location
    //     if (location.pathname === '/dashboard') {
    //       setDashboardTitle('Dashboard');
    //     } else if (location.pathname === '/ticket') {
    //       setDashboardTitle('Ticket');
    //     } else if (location.pathname === '/chat') {
    //       setDashboardTitle('Chat');
    //       }else if (location.pathname === '/newticket') {
    //       setDashboardTitle('NewTicket');
    //     }
    //   }, [location]);


  return (
    <div>
      <div className="header capitalize text-color3">
        customer details
      </div>
      <div className="agent-pic">
              <div className="pics-c rounded-full flex items-center justify-center">
                  <Person2Outlined className=' text-3xl text-color4'/>
              </div>
              <p className=' text-sm capitalize text-white'>adewumi Ayomide Oreoluwa</p>
              <div className="company capitalize text-xs text-color4">Codespro solution limited</div>
              <div className="tel text-xs text-slate-400">
                +2356790876
              </div>
              <div className="mailadress text-xs text-slate-400">
                Oreoluwaa08@gmail.com
              </div>
        </div>
        <div className="recent-ticket mt-5 ">
            <div className="header text-color3">Recent ticket</div>
            <div className="new-t-button">
            <NavLink
            to="/newticket"
            className="rounded-3xl h-6 w-4/6 flex justify-center items-center bt-p-color font-bold newt"
            activeClassName="mess"
            exact
          >
            <span className="plus mr-2 flex justify-center items-center">
              <p ><FaPlus className=' text-xs'/></p> 
            </span>
           <p>New</p> 
          </NavLink>
            </div>
        </div>
        <div className="tickets">
            <Ticketbox/>
        </div>
    </div>
  )
}

export default Customerdetails
