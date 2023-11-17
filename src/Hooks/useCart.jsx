import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useCart = () => {
    const {user} = useAuth();
    const axios = useAxios();
    const {data : cart = [], isLoading, refetch} = useQuery({
        queryKey : ['cart'],
        queryFn : async () => {
            const res = await axios.get(`/allCarts?email=${user.email}`);
            return res.data;
        }
    })
    return [cart, refetch];
}

export default useCart;