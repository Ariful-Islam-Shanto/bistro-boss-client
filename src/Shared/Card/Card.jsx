import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const Card = ({cardDetails}) => {
  const {user} = useAuth();
  const axios = useAxios();
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

   const {name, recipe, image} = cardDetails || {};

   const handleAddToCart = (item) => {
      const {name, recipe, image, category, price} = item;
      if(user && user.email) {
        const cartItem = {
          menuId : item._id,
          name,
           email : user.email,
            recipe,
             image,
              category,
               price
        }
        axios.post('/cart', cartItem)
        .then(res => {
          toast.success('Added to cart');
          console.log(res.data);
          refetch();
        })
      }
      else{
        toast.error('Please login to add to cart');  
        navigate('/login', {state : {from : location}, replace : true})
      }
   }

  return (
    <div>
      <div className="card flex h-full flex-col justify-between bg-base-100 shadow-xl">
        <figure className="">
          <img
            src={image}
            alt="Salad"
            className="rounded-xl h-[300px] w-full object-cover "
          />
        </figure>
        <div className="card-body flex-grow flex flex-col items-center justify-between  text-center space-y-4">
          <h2 className="card-title">{name}</h2>
          <p className="flex-grow">{recipe}</p>
          <div className="card-actions">
            <button onClick={() => handleAddToCart(cardDetails)} className="px-5 py-3 rounded-md border-none text-orange-600 border-b-2 border-b-orange-600 hover:bg-black bg-gray-200">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
