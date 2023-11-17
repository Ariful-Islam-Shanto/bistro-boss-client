import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useUsers = () => {
    const axiosSecure = useAxios();
    const {data : users = [], isLoading, refetch} = useQuery({
        queryKey : ['users'],
        queryFn : async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })
    return [users, refetch];
};

export default useUsers;