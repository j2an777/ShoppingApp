import React from 'react';
import '../css/Categories.css';

export default function Categories({ onSelectCategory, selectedCategory }) {
  const categories = [
    { label: "모두", value: "all" },
    { label: "전자기기", value: "electronics" },
    { label: "쥬얼리", value: "jewelery" },
    { label: "남성의류", value: "men's clothing" },
    { label: "여성의류", value: "women's clothing" },
  ];

  return (
    <div className='ctContainer'>
      <div className='ctBox'>
        <ul>
          {categories.map((category) => (
            <li key={category.label}>
              <button onClick={() => onSelectCategory(category.value)}
              style={selectedCategory === category.value ? { color: "#fff", backgroundColor: "#777A89" } : null}>
                {category.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
