import React from 'react';
import { Helmet } from 'react-helmet-async';
import banner from '../../assets/menu/banner3.jpg';
import dessertImg from '../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../assets/menu/pizza-bg.jpg';
import saladImg from '../../assets/menu/salad-bg.jpg';
import soupImg from '../../assets/menu/soup-bg.jpg';
import MenuCategory from './MenuCategory';
import useMenu from '../../Hooks/useMenu';

const Menu = () => {
    const [menu] = useMenu();

    const todayOffer = menu.filter(item => item.category === 'offered');
    const desserts = menu.filter(item => item.category === 'dessert');
    const pizzas = menu.filter(item => item.category === 'pizza');
    const salads = menu.filter(item => item.category === 'salad');
    const soups = menu.filter(item => item.category === 'soup');
    
    // console.log(salad);
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
             
             {/* //? Today's Menu */}
            <MenuCategory title='Our Menu' img={banner} items={todayOffer}secSubHeading="Don't Miss" secHeading="Today's Offer"></MenuCategory>
            <MenuCategory title='Desserts' img={dessertImg} items={desserts}></MenuCategory>
            <MenuCategory title='Pizza' img={pizzaImg} items={pizzas}></MenuCategory>
            <MenuCategory title='Salads' img={saladImg} items={salads}></MenuCategory>
            <MenuCategory title='Soups' img={soupImg} items={soups}></MenuCategory>
        </div>
    );
};

export default Menu;