import React from 'react';
import Banner from '../Banner/Banner';
import Category from './Category';
import PopularMenu from './PopularMenu';
import Featured from './Featured';
import Testimonial from './Testimonial';
import ChefRecommend from './ChefReccomend';
import { Helmet } from 'react-helmet-async';


const Home = () => {
    
    return (
        <div >
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <ChefRecommend></ChefRecommend>
            <Featured></Featured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;