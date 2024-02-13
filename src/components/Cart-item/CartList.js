import React from 'react';
import '../../css/CartList.css';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

export default function CartList() {
  const { products } = useSelector((state) => state.cart);

  return (
    <div className='CartList'>
        {products.map((product) => (
          <CartItem key={product.id} item={product} />
        ))}
    </div>
  )
}
