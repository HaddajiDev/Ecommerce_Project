import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProdutById } from '../redux/ProductSlice';
import { AddOrder } from '../redux/OrderSlice';
import { Link, useNavigate } from 'react-router-dom';
import { RemoveCartItem } from '../redux/UserSlice';
import Swal from 'sweetalert2';

function Cart() {
    const currentUser = useSelector((state) => state.user.user);
    const cartProducts = useSelector((state) => state.product.cartProduct);    
    const dispatch = useDispatch();

    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            currentUser.cart.forEach(cartItem => {
                dispatch(getProdutById(cartItem.productId));
            });
        }
    }, [currentUser, dispatch]);

    useEffect(() => {
        if (cartProducts.length > 0 && currentUser) {
            const itemsWithQuantities = currentUser.cart.map(cartItem => {
                const product = cartProducts.find(p => p._id === cartItem.productId);
                return product ? { ...product, quantity: cartItem.quantity } : null;
            }).filter(item => item !== null);
            setCartItems(itemsWithQuantities);
        }
    }, [cartProducts, currentUser]);

    const handleOrder = async() => {
        if(currentUser){
            if(currentUser.cart.length > 0){
                if(currentUser.address.city !== "" && currentUser.address.street !== "" && currentUser.address.country !== ""){
                    const products = cartItems.map(item => ({
                        productId: item._id,
                        quantity: item.quantity,
                    }));
                    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
            
                    await dispatch(AddOrder({ userId: currentUser._id, products, totalAmount }));
                    window.location.reload();
                }
                else{
                    Alert('Adresse required', 'error');
                }          
            }
        }
        else{
            navigate('/login');
        }
        
    };

    

    const handleDelete = async(productId) =>{
        const cartItem = currentUser.cart.find((el) => el.productId === productId);        
        const cartId_ = cartItem._id;
        await dispatch(RemoveCartItem({ userId: currentUser._id, cartId: cartId_ }));       
        
        window.location.reload();
    }

    return (
        <div className='container'>
            <h1 className='mt-5'>Cart</h1>
            <div className='row'>
                <div className='col-lg-9 col-sm-12'>
                    <table className='carttable mb-5'>
                        <tr>
                            <th>product</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Delete</th>
                        </tr>
                        {cartItems.map(item => (
                            <tr key={item._id}>
                                <td><img src={item.imageUrl[0]} alt='' className='img-fluid tab-img'/></td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity * item.price}</td>
                                <td><button className='delcart' onClick={() => handleDelete(item._id)}>
                                    <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                                </button></td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className='col-lg-3 col-sm-12 order-tot'>
                    <h1>
                        Order
                    </h1>                    
                    <hr />
                    <p>Total Amount : {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                    <div className='ordersButton'>
                        {cartProducts.length > 0 ? <button onClick={handleOrder}>
                            Order
                            <i class="fa fa-cart-plus" aria-hidden="true"></i>
                            </button> : <>Not products in cart</>}
                        {currentUser?.orderHistory.length > 0 ? 
                        <button className='allorders'><Link style={{all: 'unset'}} to='/orders'>view all orders</Link></button> : <></>}
                    </div>
                    
                    
                </div>
            </div>
            
            
            
        </div>
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


export default Cart;
