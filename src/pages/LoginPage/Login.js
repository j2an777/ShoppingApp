import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/Login.css';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user/userSlice';
import { setUserId } from '../../store/cart/cartSlice';

export default function Login() {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    
    const auth = getAuth(app);
    const dispatch = useDispatch();

    const goHome = () => {
        navigate('/');
    };

    const handleLogin = async (event) => {
        event.preventDefault(); // 폼 제출 기본 동작 방지
        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            // 로그인 성공 시 Redux 스토어에 사용자 정보 저장
            dispatch(setUser({
                email: userCredential.user.email,
                token: userCredential.user.refreshToken,
                id: userCredential.user.uid
            }));
            dispatch(setUserId(userCredential.user.uid));
            alert('로그인을 완료하였습니다!');
            navigate('/'); // 홈 페이지로 리디렉션
        } catch (error) {
            console.error(error);
            // 에러 메시지에 따른 조건부 처리
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                alert('잘못된 이메일 주소 또는 비밀번호입니다.');
            } else {
                alert('로그인 처리 중 오류가 발생했습니다.');
            }
        }
    };

    return (
      <div className='Login'>
          <div className='loginContainer'>
                <img src='/img/Logo.png' className='tohomeImg' onClick={goHome}/>
                <form onSubmit={handleLogin}>
                    <input 
                        type='email'
                        placeholder='E-mail'
                        name='email'
                        className='lgInput'
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <input 
                        type='password'
                        placeholder='Password'
                        name='password'
                        className='lgInput'
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <input 
                        type='submit'
                        value='로그인'
                        name='submit'
                        className='lgSubmit'
                    />
                </form>
                <div className='toSignup'>
                    <p>계정이 없습니까?</p>
                    <Link to='/register' className='suBtn'>
                        <p>가입하기</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
