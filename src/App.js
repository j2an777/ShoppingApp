import './App.css';
import Nav from './components/Nav/Nav';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Main from './pages/MainPage/Main';
import Login from './pages/LoginPage/Login';
import Detail from './pages/DetailPage/Detail';
import Register from './pages/RegisterPage/Register';
import MyPage from './pages/MyPage/MyPage';

const Layout = () => {
  return (
    <div>
      <Nav />

      <div className='LayoutContainer'>
        <Outlet />
        
        <Footer />
      </div>
    </div>
  )
}

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Layout />}>
            <Route index element = {<Main />} />
            <Route path='/login' element = {<Login />} />
            <Route path='/register' element = {<Register />} />
            <Route path='/product/:id' element = {<Detail />} />
            <Route path='/mypage/:id' element = {<MyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
