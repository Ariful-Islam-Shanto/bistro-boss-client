import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios';
import SectionTitle from '../../../Components/SectionTitle';

const PaymentHistory = () => {

    const {user} = useAuth();
    const axiosSecure = useAxios();

    const {data: payments = [], loading} = useQuery({
        queryKey : ['payments'],
        queryFn : async () => {
            const res = await axiosSecure.get(`/paymentHistory?email=${user?.email}`);
            return res.data;
        }
    })

    console.log(payments);
    return (
        <div>
            <SectionTitle subHeading='At a Glance' heading='Payment History'></SectionTitle>

            <div className="space-y-6 px-12">
        <div className="flex items-center justify-between">
          <h1 className="uppercase text-4xl text-black font-medium">Total Order : {payments?.length || 0}</h1>
        </div>
        {/* table */}
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-[#D1A054] uppercase text-white">
                <tr>
                  <th>Email</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                
                    {
                        payments?.map(payment => 
                <tr key={payment._id}>
                  <td>
                     {payment?.email}
                  </td>
                  <td>
                    {
                      payment?.category || 'Food Order'
                    }
                  </td>
                  <td>{payment?.price}</td>
                  <th>
                     {payment?.date}
                  </th>
                </tr>
                            )
                    }
                
              </tbody>
          
            </table>
          </div>
        </div>
      </div>
        </div>
    );
};

export default PaymentHistory;