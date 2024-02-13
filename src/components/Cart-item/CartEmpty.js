import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/CartEmpty.css';


export default function CartEmpty({ title }) {
  return (
    <div className='cart_empty'>
      <img src='/img/cart-x2.png' alt='cart empty' />
      <h1>{title}가 비어있습니다.</h1>
      <p>{title}에 상품을 넣어주세요.</p>
      <Link to="/" >계속 쇼핑하기</Link>
    </div>
  )
}
