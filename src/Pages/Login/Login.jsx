import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import bg from '../../assets/others/authentication.png';
import img from '../../assets/others/authentication2.png';
import { FaGoogle } from "react-icons/fa6";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
    const {signIn, googleLogin} = useAuth();
    const captchaRef = useRef(null);
    const axiosPublic = useAxiosPublic();
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    console.log(from);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleValidateCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;

        if(validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        }else{
            setDisabled(true);
        }
    }
    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');

        console.log(email, password);

        signIn(email, password) 
        .then(result => {
            navigate(from, {replace : true});
            toast.success('Successfully Logged In')
            console.log(result.user);
            
        })
        .catch(err =>{
            toast.error(err.message);
        })
    }

    const handleGoogleSignIn = () => {
      googleLogin()
      .then(res => {
        if(res) {
          const userInfo = {
            email : res.user?.email
          };
          
          //? Insert user to data base if it is a new user or don't.
          axiosPublic.post('/users', userInfo)
          .then(res => {
            console.log(res.data);
            toast.success('Successfully logged in.');
            navigate('/');
          })
        }
      })
    }


    const loginBg = {
        backgroundImage : `url(${bg})`
    }
  return (
    <div style={loginBg} className="bg-cover bg-center">
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div  className="text-center lg:text-left">
            <img src={img} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
                <h1 className="text-4xl text-black font-bold text-center">Log In</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
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
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                <LoadCanvasTemplate />
                </label>
                <input 
                onBlur={handleValidateCaptcha}
                ref={captchaRef}
                  name="captcha"
                  type="text"
                  placeholder="type the text above"
                  className="input input-bordered"
                  required
                />
                {/* <button onBlur={handleValidateCaptcha} className="btn btn-outline btn-primary bt-xs">Validate</button> */}
              </div>
              <div className="form-control mt-6">
                <button type="submit" disabled={disabled} className="btn btn-primary">Login</button>
              </div>

              <p className="text-center font-medium">New in Bistro Boss? <span className='underline text-blue-500'>#<Link to={'/register'}>Sing up</Link></span></p>
            </form>

            <div className="flex flex-col items-center justify-center gap-4">
              <p>Or sign in with</p>
               <button className="btn" onClick={handleGoogleSignIn}><FaGoogle></FaGoogle></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
