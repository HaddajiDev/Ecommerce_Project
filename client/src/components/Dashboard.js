import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteUser, GetAllUsers, UpdateUser } from '../redux/UserSlice';
import BackGroundColor from './BackGroundColor';

function Dashboard() {
    BackGroundColor('#15161D', '/dashboard');

    const users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ping, setPing] = useState(false);
    
    useEffect(() => {
        dispatch(GetAllUsers());
    }, [dispatch, ping]);

    const handleDelete = async (id) => {
        await dispatch(DeleteUser(id));
        setPing(!ping);
    };
    
    const [searchValue, setValue] = useState('');

    return (
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-12'>
                        <h1 style={{color: 'white'}} className='mb-2'>All users</h1>
                        <div className='search-box mb-3'>
                            <input type='text'
                                placeholder='Search by username'
                                className='search-dash'
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <div className='searchicon'>
                                <i class="fa fa-search fa-2x" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className='table-container'>
                            <table className='carttable'>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Orders</th>
                                        <th>Delete</th>
                                        <th>Role</th>                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.filter((el) => el.username.toLowerCase().includes(searchValue.toLowerCase())).map((el) => (
                                        <tr key={el._id}>
                                            <td>{el.username}</td>
                                            <td>{el.email}</td>
                                            <td>                                                
                                                <Link style={{all: 'unset'}} to={`/dashboard/userOrder/${el._id}`} state={{ id: el._id }}>
                                                    <button>
                                                        <i class="fa fa-eye fa-lg" aria-hidden="true"></i>
                                                    </button>
                                                </Link>                                                
                                            </td>
                                            <td>
                                                <button onClick={() => handleDelete(el._id)}><i class="fa fa-trash fa-lg" aria-hidden="true"></i></button>
                                            </td>
                                            <td>{el.isAdmin ? 'Admin' : 'User'}</td>                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='dash-button mb-5'>
                    <div>
                        <h1>View all Orders</h1>
                        <Link style={{all: 'unset'}} to='/dashboard/allOrders'><button>View All Orders</button></Link>
                    </div>
                    <div>
                    <h1>View all Products</h1>
                    <Link style={{all: 'unset'}} to='/DashBoardProducts'><button>Products</button></Link>
                </div>
                </div>
                
                
                
            </div>
        </div>
        
    );
}

export default Dashboard;
