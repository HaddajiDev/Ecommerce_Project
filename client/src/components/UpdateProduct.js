import React, { useState } from 'react';
import { Form, input, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateProduct_Put } from '../redux/ProductSlice';
import BackGroundColor from './BackGroundColor';

function UpdateProduct() {
    const location = useLocation();
    const { state } = location;

    BackGroundColor('#15161D', '/DashBoardProducts/update');

	const dispatch = useDispatch();
	const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: state?.name,
        description: state?.description,
        price: state?.price,
        category: state?.category,
        stock: state?.stock,
        discount: state?.discount,
        imageUrl: state?.imageUrl
    });

    
    const handleImageUrlChange = (index, value) => {
        const updatedImageUrl = [...product.imageUrl];
        updatedImageUrl[index] = value;
        setProduct({ ...product, imageUrl: updatedImageUrl });
    };    

    const addImageUrl = () => {
        const updatedImageUrl = [...product.imageUrl, ''];
        setProduct({ ...product, imageUrl: updatedImageUrl });
    };
    
    const removeImageUrl = (index) => {
        const updatedImageUrl = [...product.imageUrl];
        updatedImageUrl.splice(index, 1);
        setProduct({ ...product, imageUrl: updatedImageUrl });
    };

	const handleUpdate = async() => {
		await dispatch(UpdateProduct_Put({id: state?._id, newProduct: product}));
		navigate('/DashBoardProducts');
	}

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-12'>
                    <div className='producform'>
                        <div>
                            <div>Name:</div>
                            <input
                                type='text'
                                placeholder={product.name}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <div>Description:</div>
                            <input
                                as='textarea'
                                placeholder={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </div>
                        <div>
                            <div>Price:</div>
                            <input
                                type='number'
                                placeholder={product.price}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            />
                        </div>
                        <div>
                            <div>Category:</div>
                            <input
                                type='text'
                                placeholder={product.category}
                                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            />
                        </div>
                        <div>
                            <div>Stock:</div>
                            <input
                                type='number'
                                placeholder={product.stock}
                                onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                            />
                        </div>
                        <div>
                            <div>discount:</div>
                            <input
                                type='number'
                                placeholder={product.discount}
                                onChange={(e) => setProduct({ ...product, discount: e.target.value })}
                            />
                        </div>
                        <div>
                            <div>Image URLs:</div>
                            {product.imageUrl.map((url, index) => (
                                <div key={index}>
                                    <input
                                        type='text'
                                        placeholder	={url}
                                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                    />
                                    <Button variant='danger' onClick={() => removeImageUrl(index)}>
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button variant='secondary' onClick={addImageUrl}>
                                Add Image URL
                            </Button>
                        </div>
                        <button className='subprobtn mt-3 mb-5' onClick={() => handleUpdate()}>Update</button>
                    </div>
                    
                    
                </div>
            </div>

			
        </div>
    );
}

export default UpdateProduct;
