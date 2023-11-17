import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Components/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../Hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popularMenuData = menu.filter(item => item.category === 'popular');
   
    // const [menu , setMenu] = useState();

    // useEffect(() => {
    //     fetch('/menu.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         const popularItems = data.filter(item => item.category === 'popular');
    //         setMenu(popularItems);
    //     })
    // })
   
    return (
        <div className='mb-12 py-12'>
            <SectionTitle subHeading={"From Our Menu"} heading={"Popular Menu"}></SectionTitle>

            <div className='grid md:grid-cols-2 gap-10'>
                {
                    popularMenuData?.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className='flex items-center justify-center mt-8'>
      <button className="px-5 text-center py-2 rounded-lg bg-none hover:bg-black hover:text-white border-b-4 border-b-black">View Full Menu</button>
      </div>
        </div>
    );
};

export default PopularMenu;