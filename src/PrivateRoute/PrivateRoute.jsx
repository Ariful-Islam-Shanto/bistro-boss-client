import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate} from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {user, loading} = useAuth();

    if(loading) {
        return <div className='min-h-screen flex items-center justify-center'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    if(user) {
        return children;
    }

    return <Navigate to='/login' state={{from : location}} replace={true}></Navigate>
}
export default PrivateRoute;