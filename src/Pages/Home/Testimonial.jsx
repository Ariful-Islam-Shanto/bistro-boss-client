import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Components/SectionTitle';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

const Testimonial = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/reviews.json')
        .then(res => res.json())
        .then(data => {
            setReviews(data)
        })
    }, [])
    return (
        <div className='py-12'>
            <SectionTitle subHeading={"What Out Clients Say"} heading={"Testimonial"}></SectionTitle>

            <div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => 
        <SwiperSlide key={review._id} className=''>
            <div className=' mx-24 text-center flex items-center justify-center flex-col space-y-8 py-24'>
            <Rating
      style={{ maxWidth: 180 }}
      value={3}
      readOnly
    />
                <p>{review.details}</p>
                <h1 className='text-2xl text-orange-400'>{review.name}</h1>
            </div>
        </SwiperSlide>
        )
                }
        
      </Swiper>

            </div>
        </div>
    );
};

export default Testimonial;