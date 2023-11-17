import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Card from '../../Shared/Card/Card';
import './Tabs.css';

const CategoryTabs = ({handleItems, items}) => {
    const [tabIndex, setTabIndex] = useState(0);
    // const [activeCategory, setActiveCategory] = useState('Salad');
    const categories = ['Salad', 'Pizza', 'Soup', 'Dessert', 'Drinks'];

    // const handleActive = (category) => {
    //     setActiveCategory(category);
    // }


    // console.log(tabIndex === '0');
    
     

    return (
        <div className='py-12'>
   

  <Tabs className={``}  selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
    <TabList className={`flex items-center justify-center gap-6 my-10`}>
       {
        categories.map((category, index) => <Tab className={`${tabIndex === index ? 'btn border-red-400 border-none underline rounded-md' : 'btn border-yellow-400 border-2 rounded-md'}`}  onClick={() => handleItems(category)
        // handleActive(category)
        } key={index}>{category}</Tab>)
       }
    </TabList>

    {
        categories.map((category, index) => 
    <TabPanel key={index}>
        <div className='grid grid-cols-3 gap-10 px-12'>
     {
        items?.map((item, index) => <Card key={index} cardDetails={item}></Card>)
     }
     </div>
    </TabPanel>
    )}
    
  </Tabs>

        </div>
    );
};

export default CategoryTabs;