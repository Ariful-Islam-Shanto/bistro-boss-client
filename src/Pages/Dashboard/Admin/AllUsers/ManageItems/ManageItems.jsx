import React from 'react';
import SectionTitle from '../../../../../Components/SectionTitle';
import useMenu from '../../../../../Hooks/useMenu';
import { FaTrash, FaUpDown } from 'react-icons/fa6';
import { FaRegPenToSquare } from "react-icons/fa6";
import swal from 'sweetalert';
import useAxios from '../../../../../Hooks/useAxios';
import { useNavigate } from 'react-router-dom';

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu();
    const axiosSecure = useAxios();
    const navigate = useNavigate();

    const handleDeleteItem = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover it!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then( async (willDelete) => {
            if (willDelete) {
              
                const res = await axiosSecure.delete(`/deleteMenuItem/${id}`);
                if(res.data.deletedCount > 0) {
                    refetch();
                    console.log(res.data);
                    swal("Poof! Your item been deleted!", {
                        icon: "success",
                      });
                }
            } else {
              swal("Your item is safe!");
            }
          });
    }
    return (
        <div className='w-full'>
            <SectionTitle subHeading='Hurry Up' heading='Manage All Items'></SectionTitle>

            <div className="space-y-6 px-12 h-[60vh] overflow-x-auto">
        <div className="flex items-start">
          <h1 className="uppercase text-4xl text-black font-medium">Total Order : {menu.length}</h1>
        </div>
        {/* table */}
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-[#D1A054] uppercase text-white">
                <tr>
                <th>Total</th>
                  <th>Item Image</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                
                    {
                        menu?.map((item, index) => 
                <tr key={item._id}>
                    <td>{index + 1 }</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {
                        item.name
                    }
                  </td>
                  <td>{item.price}</td>
                  <th>
                    <button onClick={() => navigate(`/dashboard/updateItem/${item._id}`)} className="btn btn-ghost btn-xs"><FaRegPenToSquare></FaRegPenToSquare> </button>
                  </th>
                  <th>
                    <button onClick={() => handleDeleteItem(item._id)} className="btn btn-ghost btn-xs"><FaTrash></FaTrash> Delete</button>
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

export default ManageItems;