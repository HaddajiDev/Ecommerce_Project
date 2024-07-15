import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Route, Routes, useNavigate} from 'react-router-dom';
import Register from './components/Register';
import { useDispatch } from 'react-redux';
import { currentUser } from './redux/UserSlice';
import Profile from './components/Profile';

import PrivateRoute_ from './Private_Routes/PrivateRoute';
import Home from './components/Home';
import NavBar_ from './components/NavBar';
import Product from './components/Products/Product';
import Cart from './components/Cart';
import WishList from './components/WishList';
import Orders from './components/Orders';
import Dashboard from './components/Dashboard';
import DashBoardPrivate from './Private_Routes/DashBoardPrivate';
import DashBoardOrders from './components/DashBoardOrders';
import AddProduct from './components/AddProduct';
import DashBoardProducts from './components/DashBoardProducts';
import UpdateProduct from './components/UpdateProduct';
import DashBoardAllOrders from './components/DashBoardAllOrders';
import DashBoardOrderProducts from './components/DashBoardOrderProducts';
import OrdersPrivate from './Private_Routes/OrdersPrivate';
import SearchPage from './components/SearchPage';
import SearchByText from './components/SearchByText';
import Footer from './components/Footer';

function App() {
  const isAuth = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ping, setPing] = useState(false);
  useEffect(() => {
    if(isAuth){
      dispatch(currentUser());
    }    
  }, [ping]);

  return (
    <div className="">
      <NavBar_ ping={ping}/>


      <Routes>
        <Route path='/' element={<Home ping={ping} setPing={setPing}/>}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route element={<PrivateRoute_ />}>
          <Route path='/profile' element={<Profile ping={ping} setPing={setPing}/>} />
        </Route>

        <Route path='/product/:id' element={<Product />}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/wish' element={<WishList/>}/>
        <Route element={<OrdersPrivate />}>
          <Route path='/orders' element={<Orders/>}/>
        </Route>
        
        <Route element={<DashBoardPrivate />}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/dashboard/userOrder/:id' element={<DashBoardOrders />} />         
          <Route path='/DashBoardProducts' element={<DashBoardProducts />} /> 
          <Route path='/DashBoardProducts/add' element={<AddProduct />} /> 
          <Route path='/DashBoardProducts/update' element={<UpdateProduct />} /> 
          <Route path='/dashboard/allOrders' element={<DashBoardAllOrders />} /> 
          <Route path='/dashboard/allOrders/orderProducts' element={<DashBoardOrderProducts />} /> 
        </Route>
        <Route path='search/:seach' element={<SearchPage />}/>
        <Route path='searchtext/:seach' element={<SearchByText />}/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
