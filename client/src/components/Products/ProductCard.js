import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AddToCart, AddToWishList } from '../../redux/UserSlice';
import Swal from 'sweetalert2';

function ProductCard({product, user}) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const stuff = { //cart
    productId: product._id,
    quantity: 1
  }

  const AddQauntity = () => {
    stuff.quantity += 1;
  }

  const stuff_1 = { //WishList
    productId: product._id,
  }

  const handleStuff = () =>{
    if(currentUser){
      if(product.stock <= 0){
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
  const handleWishlist = () => {
    if(currentUser){
      dispatch(AddToWishList({id: currentUser._id, stuff_1}));
    }
    else{
      navigate('/login');
    }
  }
  return (
      <div className='pr_card col-lg-5 col-sm-12 mt-3'>
          <div className='pr_img'>
            <img src={product.imageUrl[0]} alt='' className='img-fluid'/>
          </div>         
          
            {product.discount > 0 ?
              <div className='band'>
                <p>{product.discount}% off</p>
                </div>
                :
                null
              }
          
          <div className='pr_name'>
            <p>{product.name}</p>
          </div>
          <div className='pr_price'>
            <p>{product.price}</p>
          </div>
          <div>
            {product.stock > 0 ? <p className='stock' style={{color: 'green'}}>in stock</p> : <p className='stock' style={{color: 'red'}}>out of stock</p>}
          </div>
          <div className='pr_buttons'>
            <button onClick={() => handleStuff()}>
              <i className='fa fa-shopping-cart fa-lg' aria-hidden="true"></i>
            </button>
            <button onClick={() => handleWishlist()}>
              <i className='fa fa-heart fa-lg' aria-hidden="true"></i>
            </button>
            <button>
              <Link style={{all: 'unset'}} to={`/product/${product._id}`} state={product}>
                <i className='fa fa-eye fa-lg' aria-hidden="true"></i>
              </Link>
            </button>
          </div>
          
      </div>
  )
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

export default ProductCard