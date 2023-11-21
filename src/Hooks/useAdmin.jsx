import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useAdmin = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxios();

    const {data : isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey : ['verifyAdmin'],
        enabled : !loading,
        queryFn : async () => {
            const res = await axiosSecure.get(`/verifyAdmin?email=${user?.email}`);
            return res.data?.admin;
        }
    })

    return [isAdmin, isAdminLoading];
};

export default useAdmin;


//? With enabled property we can say the query when to hit the api function. enabled takes boolean value.
//* TODO : In this case we the loading is false (that means we have the user) then hit the api and call the function.