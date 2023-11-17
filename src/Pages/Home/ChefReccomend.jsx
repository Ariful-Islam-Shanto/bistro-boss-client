import React from 'react';
import SectionTitle from '../../Components/SectionTitle';
import Card from '../../Shared/Card/Card';
import image from '../../assets/home/slide1.jpg'

const ChefRecommend = () => {

    const array = Array(3).fill(0);

    const name = 'Caeser Salad';
    const recipe = 'Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.';

    const cardDetails =  {name, recipe, image};

    return (
        <div className='pb-24'>
            <SectionTitle subHeading={'Should Try'} heading={'Chef Recommends'}></SectionTitle>

            <div className='grid md:grid-cols-3 gap-6 px-24'>
                {
                    array.map((card, index) => <Card key={index} cardDetails={cardDetails}></Card>)
                }
            </div>
        </div>
    );
};

export default ChefRecommend;