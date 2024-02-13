import React, { useState } from 'react';
import Categories from '../../components/Categories';
import '../../css/Main.css';
import Row from '../../components/Row';

export default function Main() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='mainContainer'>
      <div className='mainBox'>
        <h1>J2AN's Shop</h1>
        <Categories onSelectCategory={handleSelectCategory} selectedCategory={selectedCategory}/>
        <Row category={selectedCategory}/>
      </div>
    </div>
  )
}
