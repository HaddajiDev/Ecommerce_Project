import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductList from './Products/ProductList';
import PricingSlider from './PricingSlider';

function SearchPage() {
    const location = useLocation();
    const { state } = location;

    const [selectedCategory, setSelectedCategory] = useState(state || '');

    const priceStats = useSelector((state) => state.product.priceStats);

    const [priceRange, setPriceRange] = useState([0, 100]);
    const categories = useSelector((state) => state.product.categories);

    const handlePriceChange = (range) => {
        setPriceRange(range);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (priceStats.length > 0) {
            const statsForCategory = priceStats.find(
                (stat) => stat.category.toLowerCase() === selectedCategory.toLowerCase()
            );
            if (statsForCategory) {
                setPriceRange([statsForCategory.minPrice, statsForCategory.maxPrice]);
            } else {
                setPriceRange([0, 100]);
            }
        }
    }, [priceStats, selectedCategory]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-3 col-12-md">
                    <div className="allcata">
                        <h5>All categories</h5>
                        <hr />
                        {categories?.map((category) => (
                            <Link
                                key={category}
                                style={{ all: 'unset' }}
                                to={{ pathname: `/search/${category}`, state: category }}
                            >
                                <div
                                    className="cata"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    <h5>{capitalizeFirstLetter(category)}</h5>
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {/* <PricingSlider onChange={handlePriceChange} priceRange={priceRange} /> */}
                </div>
                    
                <div className="col-lg-9 col-md-9 col-md-12 searchProduct">
                    <ProductList
                        selectedCategory={selectedCategory}
                        priceRange={priceRange}
                        text={""}
                    />
                </div>
            </div>
        </div>
    );
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default SearchPage;
