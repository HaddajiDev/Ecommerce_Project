import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

import { AddToCart, AddToWishList } from '../../redux/UserSlice';
import Swal from 'sweetalert2';

function Product() {
    const location = useLocation();
    const {state} = location;

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const [stuff, setStuff] = useState({
      productId: state?._id,
      quantity: 1
    });

    const [currentUrl, setUrl] = useState(state?.imageUrl[0] || '');

    const changePic = (url) =>{
      setUrl(url);
    }

    const addQuantity = () => {
      setStuff(prevStuff => ({
        ...prevStuff,
        quantity: prevStuff.quantity < state?.stock ? prevStuff.quantity + 1 : prevStuff.quantity
      }));
    };
    
    const subtractQuantity = () => {
      setStuff(prevStuff => ({
        ...prevStuff,
        quantity: prevStuff.quantity > 1 ? prevStuff.quantity - 1 : prevStuff.quantity
      }));
    };

    const stuff_1 = { //WishList
      productId: state?._id,
    }

    const handleStuff = () =>{ //add to cart
      if(currentUser){
        if(state?.stock <= 0){
          Alert('Out of stock', 'error');
        }
        else{
          dispatch(AddToCart({id: currentUser._id, stuff}));
        }        
      }
      else{
        navigate('/login');
      }
    }
    const handleWishlist = () => { //add to whishlist
      if(currentUser){
        dispatch(AddToWishList({id: currentUser._id, stuff_1}));
      }
      else{
        navigate('/login');
      }
    }
    
  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-lg-6'>
            <img src={currentUrl} alt='' className='img-fluid'/>
            <div className='inpectsimgs mt-2'>
            {state?.imageUrl.map((el, index) => (
              <button style={{all: 'unset'}}
                      onClick={() => changePic(el)}
                      className='pointer'
              ><img key={index} src={el} alt='' className='img-fluid'/></button>
            ))}   
              
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='product-info'>
              <h3>{state?.name}</h3>
              <p>brand : {state?.name.split(' ')[0]}</p>
              {state?.stock > 0 ? <p className='stock' style={{color: 'green'}}>in stock</p> : <p className='stock' style={{color: 'red'}}>out of stock</p>}
              {/* <p>Description</p> */}
              <p>{state?.description}</p>
              <div className='qun-info'>
                <button onClick={() => addQuantity()}>+</button>                
                <input type='number' readOnly value={stuff.quantity} />
                <button onClick={() => subtractQuantity()}>-</button>
              </div>
              <div className='inspect-buttons mt-5'>
                <button onClick={() => handleStuff()}>
                  <p>Add To cart</p>
                  <i className='fa fa-shopping-cart fa-lg' aria-hidden="true"></i>
                </button>
                <button onClick={() => handleWishlist()}>
                  <p>Add To wishlist</p>                  
                  <i className='fa fa-heart fa-lg' aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

function Alert(text, type) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		iconColor: 'white',
		customClass: {
			popup: 'colored-toast',
		},
		showCancelButton: false,
		showConfirmButton: false,
		showDenyButton: false,
		timer: 1500,
		timerProgressBar: true,
	  })		  
	  ;(async () => {
		await Toast.fire({
		  icon: type,
		  title: text,
		})  
	})()
}

export default Product