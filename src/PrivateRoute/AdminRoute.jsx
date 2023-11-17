import React from 'react';
import useAdmin from '../Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const AdminRoute = ({children}) => {
    const location = useLocation();
    // const navigate = useNavigate();
    const [isAdmin, isAdminLoading] = useAdmin();
    const {user, loading} = useAuth();

    if(loading && isAdminLoading) {
        return <div className='min-h-screen flex items-center justify-center'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    if(user && isAdmin) {
        return children;
    }

    return <Navigate to='/login' state={{from : location}} replace={true}></Navigate>
}


export default AdminRoute;