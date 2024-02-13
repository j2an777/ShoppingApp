import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Row.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cart/cartSlice';

export default function Row({ category = 'all' }) {
    
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        if (!user.email) {
          alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
          navigate('/login');
        } else {
          dispatch(addToCart(product));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const endpoint = category === 'all' ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
            const response = await axios.get(endpoint);
            setProducts(response.data);
          } catch (error) {
            console.error('Fetching Error', error);
          }
        }
    
        fetchData();
    }, [category]);

    const truncateTitle = (title) => {
        return title.length > 20 ? title.substring(0, 15) + "..." : title;
    };

    return (
      <div className='RowContainer'>
        <div className='RowLength'>
          <p>Showing: <b>{products.length}</b> items</p>
        </div>
        <div className='RowBox'>
        {products.map((product, index) => (
          <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
            <div className='RowItem'>
              <img src={product.image} alt={product.title} />
              <h3>{truncateTitle(product.title)}</h3>
              <div className='itemBottom'>
                {/* event 인자를 명시적으로 전달하여 handleAddToCart 함수에 바인딩 */}
                <button className='goBlanket' onClick={(event) => handleAddToCart(event, product)}>장바구니에 담기</button>
                <p>$ {product.price}</p>
              </div>
            </div>
          </Link>
        ))}
        </div>
      </div>
    )
}
