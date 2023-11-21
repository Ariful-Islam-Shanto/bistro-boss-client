import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { FaCartShopping} from 'react-icons/fa6';
import useCart from '../../Hooks/useCart';
import useAdmin from '../../Hooks/useAdmin';

const Navbar = () => {
  const {user, logOut} = useAuth();
  const [isAdmin] = useAdmin();
  console.log('user', user);
  const [cart] = useCart();
  // console.log(cart);
    const navOptions = <>
<NavLink
  to="/"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-[#EEFF25]" : ""
  }
>
  HOME
</NavLink>
<NavLink
  to="/contact"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-[#EEFF25]" : ""
  }
>
  CONTACT US
</NavLink>

 {/* //? if user is admin then take user to admin home */}
{ user && isAdmin &&  
<NavLink
  to="/dashboard/adminHome"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-red-600" : ""
  }
>
 DASHBOARD
</NavLink>

}

 {/* //? if user is not admin then take user to user home */}
{ user && !isAdmin &&  
<NavLink
  to="/dashboard/userHome"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-red-600" : ""
  }
>
 DASHBOARD
</NavLink>

}
<NavLink
  to="/menu"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-red-600" : ""
  }
>
 OUR MENU
</NavLink>
<NavLink
  to="/ourShop/salad"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-red-600" : ""
  }
>
 OUR SHOP
</NavLink>
<NavLink
  to="/dashboard/cart"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-red-600" : ""
  }
>
<button className="flex gap-2 items-center">
   <FaCartShopping/>
  <div className="badge badge-secondary">+{user && cart.length}</div>
</button>
</NavLink>
    </>;

    const handleLogOut = () => {
      logOut()
      .then(res => {
          toast.success('Successfully Logged Out')
          console.log(res);
      })
      .catch(err => {
        toast.error(err.message);
      })
    }
    return (
        <div>
            <div className="navbar fixed text-white z-10 max-w-screen-xl mx-auto bg-[#6d65654a]">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content flex gap-12 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
         {navOptions}
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl">BISTRO BOSS</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 flex items-center gap-12">
      {navOptions}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user && <p className='text-white font-medium mr-6'>{user.displayName || user.email}</p>
    }
   {user ?  
      <button onClick={handleLogOut} className='btn bg-orange-500 border-none'>LogOut</button>
  :  <Link to={'/login'}>
      <button className='btn bg-orange-500 border-none'>Login</button>
    </Link>}
  </div>
</div>
        </div>
    );
};

export default Navbar;