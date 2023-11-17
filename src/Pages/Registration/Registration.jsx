import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { updateProfile } from 'firebase/auth';
import auth from '../../Firebase/firebase.config';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import useAxios from '../../Hooks/useAxios';

const Registration = () => {
    const axiosSecure = useAxios();
    const {createUser} = useAuth();
    const navigate = useNavigate();

    // const handleSignUp = e => {
    //     e.preventDefault();
    //     const form = new FormData(e.target);
    //     const name = form.get('name');
    //     const email = form.get('email');
    //     const password = from.get('password');

    //     console.log(name, email, password);

    //     createUser(email, password)
    //     .then(result => {
    //         console.log(result.user);
    //         if(result.user) {
    //             updateProfile(auth.currentUser, {
    //                 displayName: "Jane Q. User", photoURL : null
    //               }).then(() => {
    //                  toast.success('Successfully Created account');
    //               }).catch((error) => {
    //                 console.log(error);
    //               })
       

          
                  
    //         }
    //     }) 
    //     .catch(err => {
    //         console.log(err.message);
    //         toast.error(err.message);
    //     })

    // }

    //? Using react hook form

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
      } = useForm()

      const onSubmit = (data) => {
        console.log(data);

        const email = data.email;
        const password = data.password;
        const name = data.name;

        createUser(email, password)
        .then(result => {
            console.log(result.user);
            if(result.user) {
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL : null
                  }).then(() => {

                    //? After created account save user in mongodb.

                    const userInfo = {
                      name : name,
                      email : email,
                      role : 'user'
                    }
                     axiosSecure.post('/users', userInfo)
                     .then(res => {
                      if(res.data.insertedId) {
                        console.log(res.data);
                        reset();
                        toast.success('Successfully Created account');
                        navigate('/');
                      }
                     })
                    
                  }).catch((error) => {
                    console.log(error);
                  })    
            }
        }) 
        .catch(err => {
            console.log(err.message);
            toast.error(err.message);
        })
      }
    
    return (
        <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                excepturi exercitationem quasi. In deleniti eaque aut repudiandae
                et a id nisi.
              </p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                  {...register("name")}
                    name="name"
                    type="name"
                    placeholder="name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                  {...register("email")}
                    name="email"
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
            
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                  {...register("password",  { required: true, minLength : 6, maxLength: 20 , pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/})}
                    name="password"
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                   {errors.password?.type === "required" && 
                   <p className='text-red-500'>Password is required</p> }
                   {errors.password?.type === "minLength" && 
                   <p className='text-red-500'>Password must be 6 characters long</p> }
                   {errors.password?.type === "maxLength" && 
                   <p className='text-red-500'>Password can't be more than 16 characters</p> }
                  
                </div>
               
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">Sign up</button>
                </div>
                {errors.password?.type === "pattern" && 
                   <div className='text-red-500 text-xs'>Please fill this requirements first : 
                   <p>1. Password must contain a single digit from 1 to 9.</p>
                   <p>2.  password must contain one lowercase letter.</p>
                   <p>3. password must contain one uppercase letter.</p>
                   <p>4. password must contain one special character.</p>
                   <p>5.  password must be 8-16 characters long.</p>

                   
                   
                   </div> }
                <p className='text-center text-gray-600 font-medium'>Already Have an Account? <span className='underline text-blue-500'>#<Link to={'/login'}>Sing In</Link></span></p>


              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Registration;