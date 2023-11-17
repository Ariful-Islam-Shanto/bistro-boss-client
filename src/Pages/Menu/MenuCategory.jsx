import React from 'react';
import Cover from '../../Components/Cover/Cover';
import SectionTitle from '../../Components/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';

const MenuCategory = ({items, img, title, secHeading, secSubHeading}) => {
    return (
        <div>
            <Cover img={img} title={title}></Cover>
        <div className='mb-12 py-12'>
            { secHeading || secSubHeading ? <SectionTitle subHeading={secSubHeading} heading={secHeading}></SectionTitle> : ""}

            <div className='grid md:grid-cols-2 gap-10'>
                {
                    items?.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className='flex items-center justify-center mt-8'>
      <button className="px-5 text-center py-2 rounded-lg bg-none hover:bg-black hover:text-white border-b-4 border-b-black">View Full Menu</button>
      </div>
        </div>
        </div>
    );
};

export default MenuCategory;