import React from "react";
import { FaBook, FaCalendar, FaCartShopping, FaHouseMedical, FaList, FaPaypal, FaUtensils } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {

    const [isAdmin] = useAdmin();

    console.log(isAdmin);
  return (
    <div className="h-full flex">
        {/* dashboard menu */}
      <div className="min-h-screen w-64 bg-[#D1A054]">
        <ul className="menu p-4">


            {/* Admin dashboard menu */}

            {
                isAdmin ? 
                <>
        <li >
            <NavLink
              to="adminHome"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " " : ""
              }
            >
                <FaHouseMedical></FaHouseMedical>
             Admin Home
            </NavLink>
          </li>
          <li >
            <NavLink
              to="addItems"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " " : ""
              }
            >
                <FaUtensils></FaUtensils>
             Add Items
            </NavLink>
          </li>
          <li >
            <NavLink
              to="manageItems"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " " : ""
              }
            >
                <FaList></FaList>
             Manage Items
            </NavLink>
          </li>
          <li>
            <NavLink
              to="manageBooking"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " " : " "
              }
            >
                <FaBook></FaBook>
                Manage bookings
            </NavLink>
            
          </li>
          <li>
            <NavLink
              to="allUsers"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " " : " "
              }
            >
                <FaBook></FaBook>
                All Users
            </NavLink>
            
          </li>
          </>
          :

        //    userDashboardMenu
            <>
          <li >
            <NavLink
              to="userHome"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " " : ""
              }
            >
                <FaHouseMedical></FaHouseMedical>
             User Home
            </NavLink>
          </li>
          <li >
            <NavLink
              to="userHome"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " " : ""
              }
            >
                <FaCalendar></FaCalendar>
             Reservation
            </NavLink>
          </li>
          <li >
            <NavLink
              to="userHome"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " " : ""
              }
            >
                <FaPaypal></FaPaypal>
             PayMent History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="cart"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " " : " "
              }
            >
                <FaCartShopping></FaCartShopping>
              My Cart
            </NavLink>
            
          </li>
          </>
           }
          <div className="divider"></div>
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " " : " "
              }
            >
                <FaCartShopping></FaCartShopping>
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " " : " "
              }
            >
                <FaCartShopping></FaCartShopping>
              Menu
            </NavLink>
            <NavLink
              to="/ourShop/salad"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " " : " "
              }
            >
                <FaCartShopping></FaCartShopping>
              Our Shop
            </NavLink>
            
          </li>
        </ul>
      </div>

      {/* dashboard content */}
      <div className="flex-1">
         <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
