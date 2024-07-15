import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllproduct } from '../../redux/ProductSlice';
import ProductCard from './ProductCard';

function ProductList({ selectedCategory, priceRange, text }) {
    const currentUser = useSelector((state) => state.user.user);
    const Products = useSelector((state) => state.product.products);
    const dispatch = useDispatch();

    console.log(text);

    useEffect(() => {
        dispatch(GetAllproduct());
    }, [currentUser]);

    return (
        <div className='collection row'>
            
            {Products ? (
                <>
                    {Products.filter((el) => 
                        el.category &&
                        el.category.toLowerCase().includes(selectedCategory?.toLowerCase()) &&
                        el.price >= priceRange[0] &&
                        el.price <= priceRange[1]
                        // el.name.toLowerCase().includes(text?.toLowerCase())
                    ).map((el) => (
                        <ProductCard key={el._id} product={el} user={currentUser} />
                    ))}
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ProductList;
