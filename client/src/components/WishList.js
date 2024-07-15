import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProdutById_Wish } from '../redux/ProductSlice';
import { AddToCart, RemoveWishListItem } from '../redux/UserSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function WishList() {
    const currentUser = useSelector((state) => state.user.user);
    const wishProducts = useSelector((state) => state.product.wishlistProduct);
    const dispatch = useDispatch();
    
    const [wishItems, setWishItems] = useState([]);

    useEffect(() => {
        if (currentUser) {            
            currentUser.wishlist.forEach(wishItem => {
                dispatch(getProdutById_Wish(wishItem.productId));
            });
        }
    }, [currentUser, dispatch]);

    useEffect(() => {
        if (wishProducts.length > 0 && currentUser) {            
            const items = currentUser.wishlist.map(wishItem => {
                const product = wishProducts.find(p => p._id === wishItem.productId);
                return product ? { ...product } : null;
            }).filter(item => item !== null);
            setWishItems(items);
        }
    }, [wishProducts, currentUser]);

    const handleDelete = async(productId) =>{
        const cartItem = currentUser.wishlist.find((el) => el.productId == productId);        
        const cartId_ = cartItem._id;
        await dispatch(RemoveWishListItem({ userId: currentUser._id, cartId: cartId_ }));
        window.location.reload();
    }

    
    const navigate = useNavigate();
    const [stuff, setStuff] = useState({
        productId: "",
        quantity: 1
    });
    
    const handleCart = (id, quantity) => {
        const updatedStuff = { ...stuff, productId: id };
        setStuff(updatedStuff);
    
        if (currentUser) {
            if (quantity <= 0) {
                Alert('Out of stock', 'error');
            } else {
                dispatch(AddToCart({ id: currentUser._id, stuff: updatedStuff }));
            }
        } else {
            navigate('/login');
        }
    }

    return (
        <>
        <div className='container'>
            <h1 className='mt-5'>WishList</h1>
            <div className='row'>
                <div className='col-lg-12 col-sm-12'>
                    <table className='carttable mb-5'>
                        <tr>
                            <th>product</th>
                            <th>Name</th>                            
                            <th>Price</th>
                            <th>Cart</th>
                            <th>Delete</th>
                        </tr>
                        {wishItems.map(item => (
                            <tr>
                                <td>
                                    <img src={item.imageUrl[0]} alt='' className='img-fluid tab-img'/>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>{item.price}</td>
                                <td><button className='delcart' onClick={() => handleCart(item._id, item.stock)}>
                                    <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
                                </button></td>
                                <td><button className='delcart' onClick={() => handleDelete(item._id)}>
                                    <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                                </button></td>
                            </tr>
                        ))}
                    </table>
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

export default WishList;
