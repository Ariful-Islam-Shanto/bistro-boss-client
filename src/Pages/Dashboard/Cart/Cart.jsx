import React from "react";
import SectionTitle from "../../../Components/SectionTitle";
import useCart from "../../../Hooks/useCart";
import { FaDeleteLeft } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import swal from "sweetalert";


const Cart = () => {
  const [cart, refetch] = useCart();
  const axios = useAxios();

  const totalPrice = cart.reduce((sum, curr) => sum + curr.price, 0);
  console.log(totalPrice);

  const queryClient = useQueryClient();
  
  const {mutate} = useMutation({
    mutationKey: ['deleteCart', ''],
    mutationFn : async (id) => {
        const res = await axios.delete(`/deleteCart?id=${id}`);
        return res.data;
    },
    onSuccess : () => {
        queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })
  const handleDeleteItem = (id) => {
    console.log(id);
    swal({
        title: "Are you sure?",
        text: "Once deleted you won't be able to recover it!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            mutate(id);
            swal("Poof! Your Item has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your Item is safe!");
        }
      });
  }

  console.log(cart);
  return (
    <div className="px-12 ">
      <SectionTitle
        subHeading="My Cart"
        heading="Wanna Add More?"
      ></SectionTitle>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="uppercase text-4xl text-black font-medium">Total Order : {cart.length}</h1>
          <h1 className="uppercase text-4xl text-black font-medium">Total Price : {totalPrice}</h1>
          <button className="btn bg-[#D1A054]">Pay</button>
        </div>
        {/* table */}
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-[#D1A054] uppercase text-white">
                <tr>
                  <th>Item Image</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                
                    {
                        cart?.map(item => 
                <tr key={item._id}>
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
                    <button onClick={() => handleDeleteItem(item._id)} className="btn btn-ghost btn-xs"><FaDeleteLeft></FaDeleteLeft> Delete</button>
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

export default Cart;
