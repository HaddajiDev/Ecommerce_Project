import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { userRegister } from '../redux/UserSlice';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
	const[user, setUser] = useState({
		email:'',
		username:'',
		password:''
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleStuff = async() =>{
		try {
			await dispatch(userRegister(user)).unwrap();
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	}
  return (
	<div>
		
	<div><div className="cont">
	<button className='signUpbtn' onClick={() => navigate('/login')}>Log in</button>
	<div className="screen">
		<div className="screen__content">
			<div className="login">
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="Email"
					 onChange={(e) => setUser({...user, email: e.target.value})}/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="text" className="login__input" placeholder="username"
					onChange={(e) => setUser({...user, username: e.target.value})}
					/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Password"
					onChange={(e) => setUser({...user, password: e.target.value})}
					/>
				</div>
				<button className="button login__submit" onClick={() => handleStuff()}>
					<span className="button__text">Sign up now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
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
  
	</div>
  )
}

export default Register