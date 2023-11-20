import React from 'react';
import SectionTitle from '../../../../../Components/SectionTitle';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../../../Hooks/useAxiosPublic';
import useAxios from '../../../../../Hooks/useAxios';
import toast from 'react-hot-toast';

const AddItems = () => {

  const axiosSecure = useAxios()
    const axiosPublic = useAxiosPublic();
    

       const image_hosting_key = import.meta.env.VITE_IMAGE_BB_API_KEY;
        const imageBB_Hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
      } = useForm();
      const onSubmit = async (data) => {
        
        //? Host the item image into imageBB
        const imageFile = { image : data.image[0] }
        const res = await axiosPublic.post(imageBB_Hosting_Api, imageFile , {
            headers : {
                'content-type' : 'multipart/form-data'
            }
        });
        
        //? After hosting the image now save it and other item info to 
        //? the database.
        if(res.data.success) {
          const menuItem = {
            name : data.recipeName,
            recipe : data.recipeDetails,
            category : parseFloat(data.category),
            price : data.price,
            image : res.data.data.display_url
          }

          const menuRes = await axiosSecure.post('/addItem', menuItem);
          if(menuRes.data.insertedId) {
            reset();
            toast.success('Added one item to the menu');
            console.log(menuRes.data);
          }
        }
        
      }
    
    return (
        <div>
            <SectionTitle subHeading="What's new?" heading="Add An Item"></SectionTitle>
            <div className="hero min-h-screen mt-0">
  <div className="hero-content flex-col w-full lg:flex-row-reverse">
    <div className="card shrink-0 w-full shadow-2xl bg-[#F3F3F3]">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipe Name</span>
          </label>
          <input {...register('recipeName')} name='recipeName' type="text" placeholder="recipeName" className="input input-bordered bg-white" required />
        </div>
        <div className='flex items-center justify-between gap-4'>
        <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          {/* <input type="text" {...register('category')} name='category'  placeholder="Category" className="input input-bordered" required /> */}
          <select defaultValue='default' {...register('category')} name='category' className='px-5 py-3 rounded-md'>
            <option disabled value='default'>Select a Category</option>
            <option value="Salad">Salad</option>
            <option value="Pizza">Pizza</option>
            <option value="Soup">Soup</option>
            <option value="Dessert">Dessert</option>
            <option value="Drinks">Drinks</option>
          </select>
        </div>
        <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input type="text" {...register('price')} name='price'  placeholder="Price" className="input input-bordered" required />
        </div>
        </div>
        <div className='w-full'>
        <label className="label">
            <span className="label-text">Recipe Details</span>
          </label>
            <textarea {...register('recipeDetails')} name='recipeDetails'  id="" cols="30" rows="5" className='w-full border rounded-lg p-5' placeholder='Recipe Details'></textarea>
        </div>
        <div>
        <input {...register('image')} name='image' type="file" placeholder="Select a file" className="file-input bg-gray-400 file-input-bordered w-full max-w-xs" />
        </div>
        <div className=" w-full mt-6 flex flex-start">
          <button type='submit' className="px-5 py-3 border-none rounded-md bg-gradient-to-tr w- text-white from-[#835D23] to-[#B58130]">Add Item</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default AddItems;