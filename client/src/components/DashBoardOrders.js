import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetOrder } from '../redux/UserSlice';
import { useLocation } from 'react-router-dom';
import BackGroundColor from './BackGroundColor';

function DashBoardOrders() {
    
    const orders = useSelector((state) => state.user.userOrders);
    const dispatch = useDispatch();

    const location = useLocation();
    const { state } = location;
    BackGroundColor('#15161D', `/dashboard/userOrder/${state.id}`);
    useEffect(() => {
        if (state) {
            dispatch(GetOrder(state.id));
        }
    }, [state]);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h1 style={{color: 'white'}} className='mt-5 mb-5'>user order</h1>
                    <div className='table-container'>
                        <table className='carttable'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Amount</th>
                            <th>Payed ?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => (
                            <React.Fragment key={order._id}>
                                {order.products.map((product, index) => (
                                    <tr key={`${order._id}-${index}`}>
                                        <td>{product.productId.name}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.productId.price}</td>                                    
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={order.products.length}>{Math.round(order.totalAmount * 100) / 100}</td>
                                                <td rowSpan={order.products.length}>{order.state}</td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default DashBoardOrders;
