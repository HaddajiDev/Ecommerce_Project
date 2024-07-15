import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../redux/UserSlice';

function Orders() {
    const currentUser = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.user.orders);
    useEffect(() => {
        if(currentUser){
            dispatch(getUserOrders(currentUser._id));            
        }
    }, [currentUser]);
    
  return (
    <div className='container mt-5'>
        <h1>Order History</h1>
        <div className='row'>
            <div className='col-12'>
                <table className='carttable'>
                    <thead>
                        <tr>
                            <th>Name</th>
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
  )
}

export default Orders