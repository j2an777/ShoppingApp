import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteFromCart } from '../../store/cart/cartSlice';
import '../../css/CartItem.css';

export default function CartItem({ item }) {

    const dispatch = useDispatch();

    const deleteProduct = () => {
        dispatch(deleteFromCart(item.id));
    };

    const incrementCount = () => {
        dispatch(incrementCount(item.id));
    };

    const decrementCount = () => {
        dispatch(decrementCount(item.id));
    };


    return (
      <div className='cart_item'>
          <Link to = {`/product/${item.id}`}>
              <img src={item.image} alt='product card' />
          </Link>
          <div className='cart_description'>
              <h3>{item.category}</h3>
              <h2>{item.title}</h2>
              <span>
                  {item.price} x {item.quantity} = ${item.total.toFixed(2)}
              </span>
          </div>
    
          <div className='cart_count'>
              <div>
                  <button disabled={item.quantity === 1} onClick={decrementCount}>
                      -
                  </button>
                  <span>{item.quantity}</span>
                  <button disabled={item.quantity === 10} onClick={incrementCount}>
                      +
                  </button>
              </div>
          </div>
    
          <button onClick={deleteProduct} className='cart_delete'>
              <img src='/img/delete.png' alt='delete product' />
          </button>
      </div>
    )
}
