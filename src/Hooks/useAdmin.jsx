import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useAdmin = () => {
    const {user} = useAuth();
    const axiosSecure = useAxios();

    const {data : isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey : ['verifyAdmin'],
        queryFn : async () => {
            const res = await axiosSecure.get(`/verifyAdmin?email=${user?.email}`);
            return res.data?.admin;
        }
    })

    return [isAdmin, isAdminLoading];
};

export default useAdmin;