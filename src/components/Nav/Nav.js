import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/Nav.css';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../store/user/userSlice';
import { getTotalPrice } from '../../store/cart/cartSlice';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

const CartPopup = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60%;
  right: 17%;
  width: auto;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

const PopupItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const PopupItemImage = styled.img`
  width: 60px;
  height: auto;
  margin-right: 10px;
`;

const PopupItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    margin : 0;
    padding : 0;
    font-size: 14px;
    font-weight: 600;
    color: rgb(206 202 202);
  }
  h2 {
    font-size: 18px;
    font-weight: 600;
  }
`;

export default function Nav() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const cart = useSelector(state => state.cart);
    const cartItems = useSelector((state) => state.cart.products || []);
    const [showCartPopup, setShowCartPopup] = useState(false);

    useEffect(() => {
        console.log(cartItems);
        if (cartItems.length > 0) {
            setShowCartPopup(true);
            const timer = setTimeout(() => {
                setShowCartPopup(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [cartItems]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        })

        return() => {
            window.removeEventListener('scroll', () => {});
        };
    }, []);

    useEffect(() => {
        dispatch(getTotalPrice(cart));
      }, [cart]);

    const goHome = () => {
        navigate('/');
    };

    const handleMyPageAccess = () => {
        if (user.email) {
            navigate(`/mypage/${user.id}`);
        } else {
            navigate('/login');
        }
    }

    const handleLogout = () => {
        dispatch(removeUser());
        navigate('/login');
    };

    const toggleCartPopup = () => {
        setShowCartPopup(!showCartPopup);
    }

    return (
      <div className={ `nav ${show && "nav_black"}` }>
            <div className='navLeft'>
                <StyledLink to='/'>
                    <img 
                        src='/img/Logo.png'
                        alt='Logo Image'
                        className='navLogo'
                        onClick={goHome}
                    />
                </StyledLink>
            </div>
            <div className='navRight'>
                <div className='blanketAlarm' onClick={toggleCartPopup}>
                    <img src='/img/cart.png'/>
                    {cartItems.length > 0 && (
                        <div className='notifications-count'>{cartItems.length}</div>
                    )}
                </div>
                <button onClick={handleMyPageAccess} className='mypageBtn'>
                    <img src='/img/user.png' alt='mypage'/>
                </button>
                {user.email ? (
                    <p onClick={handleLogout}>Logout</p>
                ) : (
                    <StyledLink to='/login'>
                        <p>Login</p>
                    </StyledLink>
                )}
                {showCartPopup && (
                <CartPopup>
                  <div className='cartPopupContent'>
                    {cartItems.map((item, index) => (
                      <PopupItem key={item.id}>
                        <PopupItemImage src={item.image} alt={item.title} />
                        <PopupItemDetails>
                          <h3>{item.category}</h3>
                          <h2>{item.title}</h2>
                          <span>
                            ${item.price} x {item.quantity} = ${item.total.toFixed(2)}
                          </span>
                        </PopupItemDetails>
                      </PopupItem>
                    ))}
                    <h1 className='popupTotal'>합계: ${cart.totalPrice.toFixed(2)}</h1>
                    <button onClick={handleMyPageAccess} className='popupBtn'>마이페이지로 이동</button>
                  </div>
                </CartPopup>
                )}
            </div>
      </div>
    )
}
