import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home/Home';
import Menu from '../Pages/Menu/Menu';
import Order from '../Pages/Order Shop/Order';
import Login from '../Pages/Login/Login';
import Registration from '../Pages/Registration/Registration';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Cart from '../Pages/Dashboard/Cart/Cart';
import UserHome from '../Pages/Dashboard/UserHome/UserHome';
import AllUsers from '../Pages/Dashboard/Admin/AllUsers/AllUsers';

const route = createBrowserRouter([
        {
            path : '/',
            element : <MainLayout></MainLayout>,
            children : [
                {
                    path : '/',
                    element : <Home></Home>
                },
                {
                    path : '/menu',
                    element : <PrivateRoute><Menu></Menu></PrivateRoute>
                },
                {
                    path : '/ourShop/:category',
                    element : <Order></Order>
                },
                {
                    path : '/login',
                    element : <Login></Login>
                },
                {
                    path : '/register',
                    element : <Registration></Registration>
                }
            ]
        },
        {
            path : 'dashboard',
            element : <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
            children : [
                {
                    path : 'cart',
                    element : <Cart></Cart>
                },
                {
                    path : 'userHome',
                    element : <UserHome></UserHome>
                },
                {
                    path : 'allUsers',
                    element : <AllUsers></AllUsers>
                }
            ]
        }
])


export default route;