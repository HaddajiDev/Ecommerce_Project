import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../redux/UserSlice';

function Login() {
	const[user, setUser] = useState({
		email:'',		
		password:''
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogin = async () => {
		try {
		  await dispatch(userLogin(user)).unwrap();
		  navigate('/');
		} catch (error) {
		  console.error('Failed to login:', error);
		}
	};
	  
  return (
	<div><div className="cont">
		<button className='signUpbtn' onClick={() => navigate('/register')}>Sign Up</button>
	<div className="screen">
		<div className="screen__content">
			<div className="login">
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="User name / Email"
					onChange={(e) => setUser({...user, email: e.target.value})} />
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Password"
					onChange={(e) => setUser({...user, password: e.target.value})} />
				</div>
				<button className="button login__submit" onClick={()=> handleLogin()}>
					<span className="button__text">Log In Now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</div>
			<div className="social-login">
				<h3>log in via</h3>
				<div className="social-icons">
					<a href="#" className="social-login__icon fab fa-instagram"></a>
					<a href="#" className="social-login__icon fab fa-facebook"></a>
					<a href="#" className="social-login__icon fab fa-twitter"></a>
				</div>
			</div>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
		
	</div>

	
</div></div>
  )
}

export default Login