import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../../css/Register.css';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '../../firebase';
import { setUser } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Register() {
    const navigate = useNavigate();
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const dispatch = useDispatch();
    const auth = getAuth(app);

    const goHome = () => {
        navigate('/');
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // 폼 제출 기본 동작 방지
        try {
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            .then((userCredential) => {
                // 리덕스 스토어에 데이터 담기
                dispatch(setUser({
                    email: userCredential.user.email,
                    token: userCredential.user.refreshToken,
                    id: userCredential.user.uid
                }))
                event.preventDefault();
                alert('회원가입을 완료하였습니다!');
                navigate('/login');
            })
        } catch (error) {
            console.error(error);
        }
    };

    return (
      <div className='Register'>
            <div className='registerContainer'>
                  <img src='/img/Logo.png' className='tohomeImg' onClick={goHome}/>
                  <form onSubmit={handleSubmit}>
                      <input 
                          type='email'
                          placeholder='E-mail'
                          name='email'
                          className='rgInput'
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                      />
                      <input 
                          type='password'
                          placeholder='Password'
                          name='password'
                          className='rgInput'
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                      <input 
                          type='submit'
                          value='회원 가입'
                          name='submit'
                          className='rgSubmit'
                      />
                  </form>
                  <div className='toLogin'>
                      <p>이미 계정이 있습니까?</p>
                      <Link to='/login' className='suBtn'>
                          <p>로그인</p>
                      </Link>
                  </div>
              </div>
          </div>
    )
}
