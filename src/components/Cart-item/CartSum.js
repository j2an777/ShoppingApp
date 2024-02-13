import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTotalPrice, postOrder } from '../../store/cart/cartSlice';
import { Link } from 'react-router-dom';
import '../../css/CartSum.css';

export default function CartSum() {

  const { id, email, token } = useSelector((state) => state.user);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [cart]);


  const sendOrder = () => {
    dispatch(postOrder(cart));
  };

  return (
    <div className='cart_sum'>
      <div>
        <p>
          {" "}
          <span>합계:</span> ${cart.totalPrice.toFixed(2)}
        </p>

        {id ?
          <button
            className='checkout_button'
            onClick={() => sendOrder()}
          >계산하기
          </button>
          :
          <Link className='checkout_button' to='/login'>
            로그인
          </Link>
        }
      </div>
    </div>
  )
}
