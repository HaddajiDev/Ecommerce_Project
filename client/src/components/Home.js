import { useDispatch, useSelector } from 'react-redux';
import { GetAllcategories, GetAllproduct, GetHighestPrice } from '../redux/ProductSlice';
import { useEffect } from 'react';
import ProductCard from './Products/ProductCard';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

function Home() {
    const Products = useSelector((state) => state.product.products);
    const categories = useSelector(state => state.product.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAllcategories());
        dispatch(GetHighestPrice());
        dispatch(GetAllproduct());
    }, [dispatch]);

    

    const MouseCollection = Products?.filter((el) => el.category.toLowerCase() === 'mouse' && el.discount === 0).slice(0, 4);
    const KeyboardCollection = Products?.filter((el) => el.category.toLowerCase() === 'keyboard' && el.discount === 0).slice(0, 4);

    const topSelling = Products?.filter((el) => el.stock <= 20 && el.stock > 1 && el.discount == 0).slice(0, 6);
    const Discounts = Products?.filter((el) => el.discount > 0).slice(0, 6);

    return (
        <>           

            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-lg-3 col-sm-12 mb-5'>
                        <div className='allcata'>
                            <h5>All categories</h5>
                            <hr />
                            {categories?.map((category) => (
                                <Link style={{all: 'unset'}} to={`/search/${category}`} state={category}>
                                    <div className='cata'>
                                        <h5  key={category} value={category}>{capitalizeFirstLetter(category)}</h5>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className=''>
                            <img src='https://www.sbsinformatique.com/modules/tvcmsleftsideofferbanner/views/img/collection%20tapis%20de%20souris_20240603101452.jpg'
                                className='img-fluid mt-5'
                                alt=''
                                width={`100%`}
                            />
                        </div>
                    </div>
                    

                    <div className='col-lg-7 col-sm-12 middle-section'>
                        {/* <img
                            src='https://www.sbsinformatique.com/modules/tvcmsslider/views/img/7cd12dbb2f6eabb5668c_SUMMER-WEB.jpg'
                            alt=''
                            className='img-fluid'
                        /> */}
                        <Carousel className=''>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://www.sbsinformatique.com/modules/tvcmsslider/views/img/7cd12dbb2f6eabb5668c_SUMMER-WEB.jpg"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://www.sbsinformatique.com/modules/tvcmsslider/views/img/440e800bcb9782f92a2e_5500-1660TI-WEEB.jpg"
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://www.sbsinformatique.com/modules/tvcmsslider/views/img/5e0bf996ffc8a42b4475_coral-specs-R.jpg"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://www.sbsinformatique.com/modules/tvcmsslider/views/img/a3bd7da4560ba4018864_lenovo-669.png"
                                    alt="fouth slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                        <h1 className='mt-5'>Mouse Collection</h1>
                        <div className='collection row'>
                            {MouseCollection?.map((el) => (
                                <ProductCard product={el}/>
                            ))}
                        </div>
                        <div className='mt-5 viewAllbtn'>
                            <Link style={{all: 'unset'}}
                             to={`/search/${'mouse'}`} state={'mouse'}
                             ><button><i className='fa fa-eye fa-lg' aria-hidden="true"></i>View all</button></Link>
                        </div>
                        <h1 className='mt-5'>Keyboard Collection</h1>
                        <div className='collection row'>
                            {KeyboardCollection?.map((el) => (
                                <ProductCard product={el}/>
                            ))}
                        </div>
                        <div className='mt-5 viewAllbtn'>
                            <Link style={{all: 'unset'}}
                             to={`/search/${'keyboard'}`} state={'keyboard'}
                             ><button><i className='fa fa-eye fa-lg' aria-hidden="true"></i>View all</button></Link>
                        </div>
                        
                        
                    </div>                    
                    <div className='col-lg-2 col-sm-12'>
                        <img
                            src='https://www.sbsinformatique.com/modules/tvcmssliderofferbanner/views/img/7000.jpg'
                            alt=''
                            className='img-fluid'
                        />
                        <img
                            src='https://www.sbsinformatique.com/modules/tvcmssliderofferbanner/views/img/SUMMER-5600X-3060.jpg'
                            alt=''
                            className='img-fluid mt-2'
                        />
                        
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className='col-12'>
                        <h1>Top Selling</h1>
                    </div>
                </div>
                <div className='row mb-5'>
                    <div className='col-12 caro searchProduct'>
                        {topSelling?.map((el) => (
                            <ProductCard product={el}/>
                        ))}
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-12'>
                        <h1>Discounts</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 caro searchProduct'>
                        {Discounts?.map((el) => (
                            <ProductCard product={el}/>
                        ))}
                    </div>
                </div>
            </div>
            
        </>
    );
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Home;
