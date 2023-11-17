import React, { useEffect, useState } from 'react';
import orderImg from '../../assets/shop/banner2.jpg';
import Cover from '../../Components/Cover/Cover';
import CategoryTabs from '../../Components/Category Tabs/CategoryTabs';
import useMenu from '../../Hooks/useMenu';
import { useParams } from 'react-router-dom';

const Order = () => {
    const [menu] = useMenu();
    const [items, setItems] = useState([])
    // const {category} = useParams();


    const handleItems = (category) => {
        const categoryName = category.toLowerCase();
        const newCategory = menu.filter(item => item.category === categoryName);
        setItems(newCategory);
    }

//    useEffect(() => {
//     // if(category) {
//         const initialCategory = menu.filter(item => item.category === category);
//         setItems(initialCategory);
//     // }
//    }, [menu])

//    console.log(items);
    return (
        <div>
            <Cover img={orderImg} title="Our Shop"></Cover>
            <CategoryTabs handleItems={handleItems} items={items}></CategoryTabs>
        </div>
    );
};

export default Order;