import React from 'react';

const SectionTitle = ({subHeading, heading}) => {
    return (
        <div className='mx-auto text-center md:w-4/12 my-8'>
            <p className='text-yellow-600 text-center my-2'>--- {subHeading} ---</p>
            <h3 className='text-4xl uppercase border-py-4 py-4'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;