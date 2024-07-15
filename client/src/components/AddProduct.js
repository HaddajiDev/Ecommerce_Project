import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { PostProduct } from '../redux/ProductSlice';
import BackGroundColor from './BackGroundColor';

function AddProduct() {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
        discount: 0,
        imageUrl: []
    });
    BackGroundColor('#15161D', '/DashBoardProducts/add');
	const categories = useSelector(state => state.product.categories);

    const [imgUrl, setImage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Addimg = (img) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            imageUrl: [...prevProduct.imageUrl, img]
        }));
        setImage('');
    };

    const handlePost = async() => {
        await dispatch(PostProduct(product));
        navigate('/');
    };

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-12'>
                    <div className='producform'>
                        <div>
                            <div>Product Name</div>
                            <input
                                type='text'
                                placeholder='Product name'
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <div>Description</div>
                            <input
                                type='text'
                                placeholder='Description'
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </div>
                        <div>
                            <div>Price</div>
                            <input
                                type='number'
                                placeholder='Price'
                                min={0}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            />
                        </div>
                        <div>
                            <div>Category : ({categories.toString().split('')})</div>
                            <input
                                type='text'
                                placeholder="Category"
                                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            />
                        </div>
                        <div>
                            <div>Stock</div>
                            <input
                                type='number'
                                placeholder='Stock'
                                min={0}
                                onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                            />
                        </div>
                        <div>
                            <div>Discount</div>
                            <input
                                type='number'
                                placeholder='discount'
                                min={0}
                                onChange={(e) => setProduct({ ...product, discount: e.target.value })}
                            />
                        </div>
                        <div>
                            <div>Image URL</div>
                            <input
                                type='text'
                                placeholder='Image URL'
                                value={imgUrl}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <button className='add-btn mt-3' type='button' onClick={() => Addimg(imgUrl)}>Add Image URL</button>
                        </div>
                        
                        
                        <button className='subprobtn mb-5' type='button' onClick={handlePost}>Add Product</button>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}

export default AddProduct;
