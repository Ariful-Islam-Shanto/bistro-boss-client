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
import AddItems from '../Pages/Dashboard/Admin/AllUsers/AddItems/AddItems';
import AdminRoute from '../PrivateRoute/AdminRoute';
import ManageItems from '../Pages/Dashboard/Admin/AllUsers/ManageItems/ManageItems';
import UpdateItem from '../Pages/Dashboard/Admin/UpdateItem/UpdateItem';
import Payment from '../Pages/Dashboard/Payment/Payment';
import PaymentHistory from '../Pages/Dashboard/Payment/PaymentHistory';
import AdminHome from '../Pages/Dashboard/Admin/AdminHome/AdminHome';

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
                //? user routes
                {
                    path : 'cart',
                    element : <Cart></Cart>
                },
                {
                    path : 'userHome',
                    element : <UserHome></UserHome>
                },
                {
                    path : '/dashboard/payment',
                    element : <Payment></Payment>
                },
                {
                    path : '/dashboard/history',
                    element : <PaymentHistory></PaymentHistory>
                },
                //? Admin only path
                {
                    path : 'adminHome',
                    element : <AdminRoute><AdminHome></AdminHome></AdminRoute>                },
                {
                    path : 'allUsers',
                    element : <AdminRoute><AllUsers></AllUsers></AdminRoute>
                },
                {
                    path : 'addItems',
                    element : <AdminRoute><AddItems></AddItems></AdminRoute>
                },
                {
                    path : 'manageItems',
                    element : <AdminRoute><ManageItems></ManageItems></AdminRoute>
                }
                ,
                {
                    path : 'updateItem/:id',
                    element : <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                    loader : ({params}) => fetch(`https://bistro-boss-server-zeta-six.vercel.app/menuById/${params.id}`)
                }
            ]
        }
])


export default route;