import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllOrders, UpdateOrder_Put } from '../redux/OrderSlice';
import { Link, useNavigate } from 'react-router-dom';
import BackGroundColor from './BackGroundColor';
import Swal from 'sweetalert2';

function DashBoardAllOrders() {
    BackGroundColor('#15161D', '/dashboard/allOrders');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[ping, setPing] = useState(false);
    const orders = useSelector((state) => state.order.orders);

    useEffect(() => {
        const fetchOrders = async () => {
            await dispatch(AllOrders());            
        };
        fetchOrders();
    }, [dispatch, ping]);

    const handleUpdate = async(id_) => {
        await dispatch(UpdateOrder_Put({id: id_, state: {state: "Payed"}}));
        setPing(!ping);
        Alert('Payed');
    }
    const [searchValue, setValue] = useState('');

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h1 style={{color: 'white'}} className='mt-5 mb-3'>All users orders</h1>
                    <div className='search-box mb-3'>
                        <input type='text'
                            placeholder='Search by user email'
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
                                <th>User Eamil</th>
                                <th>Products</th>
                                <th>Date</th>
                                <th>Total Amount</th>
                                <th>State</th>
                                <th>Change State</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.filter((el) => el.user.email.toLowerCase().includes(searchValue.toLowerCase())).map((el) => (
                                <tr key={el._id}>
                                    <td>{el.user.email}</td>
                                    <td><Link style={{all: 'unset'}} to={`/dashboard/allOrders/orderProducts`} state={{ products: el.products }}>
                                        <button>View</button></Link></td>
                                    <td>{new Date(el.orderDate).toLocaleDateString()}</td>
                                    <td>{Math.round(el.totalAmount * 100) / 100}</td>
                                    <td>{el.state}</td>
                                    <td>{el.state == "Payed" ? <>----</> :<button onClick={() => handleUpdate(el._id)}>Payed</button>}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
            
        </div>
    );
}



function Alert(text) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		iconColor: 'white',
		customClass: {
			popup: 'colored-toast',
		},
		showCancelButton: false,
		showConfirmButton: false,
		showDenyButton: false,
		timer: 1500,
		timerProgressBar: true,
	  })		  
	  ;(async () => {
		await Toast.fire({
		  icon: 'success',
		  title: text,
		})  
	})()
}

export default DashBoardAllOrders;
