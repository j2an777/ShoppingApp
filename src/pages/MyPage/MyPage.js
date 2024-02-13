import React from 'react';
import '../../css/MyPage.css';
import CartList from '../../components/Cart-item/CartList';
import CartSum from '../../components/Cart-item/CartSum';
import { useSelector } from 'react-redux';
import CartEmpty from '../../components/Cart-item/CartEmpty';


export default function MyPage() {
    const { products } = useSelector((state) => state.cart);


    return (
      <div className='MyPage'>
        {!products.length ? (
            <CartEmpty title="Cart" />
        ) : (
            <div className='mpContainer'>
              <h1>마이페이지</h1>
              <CartList />
              <CartSum />
            </div>
        )}
      </div>
    )
}
