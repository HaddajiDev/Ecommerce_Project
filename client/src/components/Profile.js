import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  logout, UpdateUser } from '../redux/UserSlice';
import { useNavigate } from 'react-router-dom';


function Profile() {
  const currentUser = useSelector((state) => state.user.user);
  
  const [openEdit, setOpen] = useState(false);
  const [edited, setEdited] = useState({
    email: currentUser?.email,
    username: currentUser?.username,
    password: currentUser?.password,
    isAdmin: currentUser?.isAdmin,
    address: {
      street: currentUser?.address.street,
      city: currentUser?.address.city,
      state: currentUser?.address.state,
      postalCode: currentUser?.address.postalCode,
      country: currentUser?.address.country
    },
  });

  const dispatch = useDispatch();
	const navigate = useNavigate();

  const [imgUrl, setAvatar] = useState('');
  useEffect(() => {
      const avatarUrl = `https://api.dicebear.com/9.x/thumbs/svg?seed=${currentUser?.username}&flip=true&backgroundColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&backgroundType=solid,gradientLinear&backgroundRotation=0,10,20&shapeColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,transparent` 
      // const avatarUrl = `https://api.dicebear.com/9.x/thumbs/svg?seed=${currentUser?.username}`;        
      setAvatar(avatarUrl);
      
  }, [currentUser]);

	const handleLogOut = () => {
		dispatch(logout());
		navigate('/');
	}

  const handleStuff = () => {
    dispatch(UpdateUser({ id: currentUser?._id, edited }));  
    setOpen(false);  
  };
  
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-4 profile-left'>
          <img src={imgUrl} className='img-fluid' alt=''/> 
          <button className='mt-5 logout' onClick={() => handleLogOut()}>Logout <i className="fa fa-caret-right fa-2x" aria-hidden="true"></i></button> 
                  
        </div>
        
        <div className='col-8 profile-right'>
          {openEdit ? <><h2>Username : <input type='text' onChange={(e) => setEdited({...edited, username: e.target.value})} placeholder={currentUser?.username}/></h2></> : <h2>Username : {currentUser?.username}</h2>}
          {openEdit ? <><h2>email : <input type='text' onChange={(e) => setEdited({...edited, email: e.target.value})} placeholder={currentUser?.email}/></h2></> : <h2>email : {currentUser?.email}</h2>}
          <h2 className='mt-5'>Address</h2>
          {openEdit ? <><h2>street : <input type='text' value={edited.address.street} onChange={(e) => setEdited({...edited, address:{...edited.address, street: e.target.value}})} placeholder={currentUser?.address.street}/></h2></> : <h2>street : {currentUser?.address.street}</h2>}
          {openEdit ? <><h2>city : <input type='text' value={edited.address.city} onChange={(e) => setEdited({...edited, address:{...edited.address, city: e.target.value}})} placeholder={currentUser?.address.city}/></h2></> : <h2>city : {currentUser?.address.city}</h2>}
          {openEdit ? <><h2>state : <input type='text' value={edited.address.state} onChange={(e) => setEdited({...edited, address:{...edited.address, state: e.target.value}})} placeholder={currentUser?.address.state}/></h2></> : <h2>state : {currentUser?.address.state}</h2>}
          {openEdit ? <><h2>postalCode : <input type='text' value={edited.address.postalCode} onChange={(e) => setEdited({...edited, address:{...edited.address, postalCode: e.target.value}})} placeholder={currentUser?.address.postalCode}/></h2></> : <h2>postalCode : {currentUser?.address.postalCode}</h2>}
          {openEdit ? <><h2>country : <input type='text' value={edited.address.country} onChange={(e) => setEdited({...edited, address:{...edited.address, country: e.target.value}})} placeholder={currentUser?.address.country}/></h2></> : <h2>country : {currentUser?.address.country}</h2>}
          <div className='profile-button'>
            {openEdit ? <button onClick={() => handleStuff()}>Confirm <i class="fa fa-check" aria-hidden="true"></i></button> : <></>}
            {openEdit ? <button onClick={() => setOpen(!openEdit)}>Cancel <i class="fa fa-ban" aria-hidden="true"></i></button> : <button onClick={() => setOpen(!openEdit)}>Edit <i class="fa fa-wrench" aria-hidden="true"></i></button>}
          </div>
                   
        </div>
      </div>
    </div>
  );
}
export default Profile;
