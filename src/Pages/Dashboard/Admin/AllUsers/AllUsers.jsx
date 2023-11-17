import React from 'react';
import SectionTitle from '../../../../Components/SectionTitle';
import useUsers from '../../../../Hooks/useUsers';
import { FaDeleteLeft, FaTrash, FaUser, FaUsers } from 'react-icons/fa6';
import swal from 'sweetalert';
import useAxios from '../../../../Hooks/useAxios';

const AllUsers = () => {

    const [users, refetch] = useUsers();
    const axiosSecure = useAxios();

    //? Change user role to admin
    const handleUserRole = (id) => {
      swal({
        title: "Are you sure?",
        text: "Do you want to make this user admin?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          //* Update user role ad admin.
          refetch();
          axiosSecure.patch(`/updateRole/${id}`)
          .then(res => {
            if(res.data.modifiedCount > 0) {
              refetch();
              swal("Poof! User is now admin!", {
                icon: "success",
              });
            }
          })
        } else {
          swal("Role is still user!");
        }
      });
    }

    const handleDeleteUser = (id) => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this user!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          //*Delete user from database.
          axiosSecure.delete(`/deleteUser/${id}`)
          .then(res => {
            if(res.data.deletedCount > 0) {
              refetch();
              swal("Poof! User has been deleted!", {
                icon: "success",
              });
            }
          })
        } else {
          swal("User is safe!");
        }
      });
    }
    return (
        <div className='px-12'>
            <SectionTitle subHeading='How many??' heading='Manage All Users'></SectionTitle>


            {/* Users data table */}
            <div>
          <div className="overflow-x-auto w-full">
            <table className="table">
              {/* head */}
              <thead className="bg-[#D1A054] uppercase text-white">
                <tr>
                    <th>Total</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                
                    {
                        users?.map((user, index) => 
                <tr key={user._id}>
                    <td>{index + 1}</td>
                  <td>
                    {user?.name}
                  </td>
                  <td>
                    {
                       user?.email
                    }
                  </td>
                  <td>{ user.role === 'Admin' ? 'Admin' : <button onClick={() => handleUserRole(user._id)}><FaUsers></FaUsers></button>}</td>
                  <th>
                    <button onClick={() => handleDeleteUser(user._id)} className="btn btn-ghost btn-xs"><FaTrash></FaTrash> Delete</button>
                  </th>
                </tr>
                            )
                    }
                
              </tbody>
          
            </table>
          </div>
        </div>
        </div>
    );
};

export default AllUsers;