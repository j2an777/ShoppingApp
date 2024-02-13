import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import '../../css/Detail.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cart/cartSlice';

export default function Detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Fetching Error', error);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!user.email) {
            alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
            navigate('/login');
        } else {
            if (product) {
                dispatch(addToCart(product));
                setIsAddedToCart(true);
                alert('장바구니에 상품이 추가되었습니다.');
            }
        }
    };

    if (!product) return <Loader />;

    return (
        <div className='Detail'>
            <div className='dtContainer'>
                <div className='dtImg'>
                    <img src={product.image} alt={product.title} /> 
                </div>
                <div className='dtInfo'>
                    <h3>{product.category}</h3>
                    <h1>{product.title}</h1>
                    <h4>$ {product.price}</h4>
                    <p>{product.description}</p>
                    <div className='toBlanket'>
                        <button onClick={handleAddToCart}>
                            {isAddedToCart ? '장바구니에 담긴 제품' : '장바구니에 담기'}
                        </button>
                        <Link to={user?.email ? `/mypage/${user.id}` : '/login'}>마이페이지로 이동</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
