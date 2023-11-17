import React from 'react';
import SectionTitle from '../../Components/SectionTitle';
import featuredImage from '../../assets/home/featured.jpg';

const Featured = () => {

    const bg = {
        backgroundImage : `url(${featuredImage})`
    }

    return (
        <div style={bg} className='relative bg-fixed bg-cover'>
            <div className='bg-gradient-to-tr from-[#080808] to-[#00000000] h-full w-full absolute z-0'>

                </div>
                <div className='relative text-white z-20 py-12'>
            <SectionTitle subHeading={"Check it Out"} heading={"From Our Menu"}>
            </SectionTitle>

            <div className=' md:flex items-center justify-center py-8 px-16 gap-10'>
                <div>
                   <img className='rounded-lg' src={featuredImage} alt="" />
                </div>
                <div className='md:pb-10 space-y-6'>
                    <p>Aug 20, 2029</p>
                    <p className='uppercase'>Where can I get some?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt modi odio, reiciendis dolorum tempora asperiores provident omnis quos perferendis repellat, ratione nam. Consequuntur, architecto aliquam blanditiis perspiciatis fuga iste pariatur provident minus exercitationem at facilis ea nisi delectus. Nesciunt nemo ut neque velit, eos veritatis saepe harum eum minima laborum.</p>
                    <button className="px-5 py-2 rounded-lg bg-none hover:bg-white hover:text-black border-b-4 border-b-white">Order now</button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Featured;