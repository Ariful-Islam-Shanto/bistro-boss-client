import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';


// {
//   //? To send the token from localStorage to server side.
//   headers : {
//       authorization : `Bearer ${localStorage.getItem('access-token')}`
//   }
// }

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  });

const useAxios = () => {
  const {logOut} = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(function (config) {
    //? Do something before request is sent

    const token = localStorage.getItem('access-token')
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
  
    return Promise.reject(error);
  });


  //? Add a response interceptor
axiosSecure.interceptors.response.use(function (response) {

  return response;
}, function (error) {
   const status = error.response.status;
  //  console.log("interceptor", status);
   //* For 401 or 403 logout the user.
   if(status === 401 || status === 403) {
      logOut();
      navigate('/login');
   }
  return Promise.reject(error);
});
    
  return axiosSecure;
};

export default useAxios;