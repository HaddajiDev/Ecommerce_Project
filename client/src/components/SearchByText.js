import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from './Products/ProductList';

function SearchByText() {
    const location = useLocation();
    const { state } = location;
    console.log(state.searchQuery);

    return (
        <div className='container middle-section'>
            <ProductList text={state?.searchQuery}
                priceRange={[0, 0]}
            />
        </div>
    );
}

export default SearchByText;
