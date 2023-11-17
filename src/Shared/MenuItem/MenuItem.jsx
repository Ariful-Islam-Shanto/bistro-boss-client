import React from 'react';

const MenuItem = ({item}) => {

    const {_id,
            name,
            recipe,
            image,
            category,
            price} = item || {};
    return (
        <div className='flex space-x-4'>
                <img className='w-[90px] h-[80px] rounded-tr-full rounded-br-full rounded-bl-full' src={image} alt="" />
            <div>
                <h1 className='uppercase'>{name}----------</h1>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-500'>{price}</p>
        </div>
    );
};

export default MenuItem;