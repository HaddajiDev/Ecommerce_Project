import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/UserSlice';
import '../components/Navbar.css'

function NavBar_({}) {
    const currentUser = useSelector((state) => state.user.user);
    const CART = useSelector((state) => state.user.cart);
    const [cart, setCart] = useState(0); 

    const wishlist = useSelector((state) => state.user.cart);
    const [wish, setWish] = useState(0);    
    
	const navigate = useNavigate();
	
    const handleRoute = (path) =>{
        if(path == '/cart' && currentUser){
            navigate(path)
        }        
        else if(path == '/wish' && currentUser){
            navigate(path);
        }
        else{
            navigate('/login')
        }
    }
    const [imgUrl, setAvatar] = useState('');
    useEffect(() => {
        const avatarUrl = `https://api.dicebear.com/9.x/thumbs/svg?seed=${currentUser?.username}&flip=true&backgroundColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&backgroundType=solid,gradientLinear&backgroundRotation=0,10,20&shapeColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,transparent` 
        setAvatar(avatarUrl);
        const totalQuantity = currentUser?.cart.reduce((total, item) => total + item.quantity, 0);
        setCart(totalQuantity);

        const totalWishs = currentUser?.wishlist.length;
        setWish(totalWishs);
    }, [currentUser]);

    useEffect(() => {
        const totalQuantity = currentUser?.cart.reduce((total, item) => total + item.quantity, 0);
        setCart(totalQuantity);
    }, [CART]);

    useEffect(() => {
        const totalWishs = currentUser?.wishlist.length;
        setWish(totalWishs);
    }, [wishlist]);


    const handleSearch = (event) => {
        event.preventDefault();
        const searchQuery = event.target.SearchInput.value;
        navigate(`/searchtext/${searchQuery}`, {
            state: { searchQuery },
        });
    };
    
  return (
    <div className=''>
        <div className='navbarTop'>
            <div className='container top-space'>
                <div className='nav-space'>
                    <div>
                        <i className='fa fa-phone' aria-hidden="true"></i>
                        <p>+21625275</p>
                    </div>
                    <div>
                        <i className='fa fa-envelope' aria-hidden="true"></i>
                        <p>ahmedhaddajiahmed@gmail.com</p>
                    </div>
                    <div>
                        <i className='fa fa-globe' aria-hidden="true"></i>
                        <p>Tunisia</p>
                    </div>
                </div>
                <div>
                    <div style={{cursor: 'pointer'}} >
                        {currentUser ? 
                            <div className='account'>
                                <div>
                                    {imgUrl ? <button style={{all: 'unset'}}
                                    onClick={() => navigate('/profile')}><img src={imgUrl} alt="" /></button> : <p></p>}
                                    <button style={{all: 'unset'}} onClick={() => navigate('/profile')}>
                                        <p>{currentUser.username}</p>
                                    </button>
                                </div>                                
                                <div>
                                    
                                    {currentUser.isAdmin ?
                                    <>
                                        <button style={{all: 'unset'}} onClick={() => navigate('/dashboard')}>
                                            <i className='bi bi-speedometer' aria-hidden="true"></i>
                                        </button>
                                        <button style={{all: 'unset'}} onClick={() => navigate('/dashboard')}>
                                            <p>DashBoard</p>    
                                        </button>
                                    </>
                                    : <></> }
                                    
                                </div>
                                
                            </div>
                            :
                            <>
                                <button style={{all: 'unset'}} onClick={() => navigate('/login')}>
                                    <i className='fa fa-user' aria-hidden="true"></i>
                                </button>
                                <button style={{all: 'unset'}} onClick={() => navigate('/login')}>
                                    <p>Login</p>
                                </button>                                
                            </>
                        }                        
                    </div>
                </div>                
            </div>                
        </div>
        <div className='navbarr'> 
            <div className='container'>
                <div className='nav-bottom'>
                    <div>
                        <button className='brand pointer' style={{all: 'unset'}} onClick={() => navigate('/')}><div className='brand-title'><h1>Store</h1><div className='dot'></div></div></button>
                    </div>
                    
                    <div>
                        <form onSubmit={handleSearch} className="Search-form">
                            <div className="Search-inner">
                                <input type="search" id="SearchInput" placeholder="Search"/>
                                <label className="Label" for="SearchInput"></label>  
                            </div>                        
                        </form>
                    </div>
                    <div className='cartwish'>
                        <button className='pointer' style={{ all: 'unset', position: 'relative' }} onClick={() => handleRoute('/cart')}>
                            <i className='fa fa-shopping-cart fa-lg' aria-hidden="true"></i>
                            <span className='badge'>{cart}</span>
                        </button>
                        <button className='pointer' style={{ all: 'unset', position: 'relative' }} onClick={() => handleRoute('/wish')}>
                            <i className='fa fa-heart fa-lg' aria-hidden="true"></i>
                            <span className='badge'>{wish}</span>
                        </button>
                    </div>
                </div>              
            </div>           
           
            
           
        </div>
        <div className='redLine'></div>
    </div>       
  )
}

export default NavBar_