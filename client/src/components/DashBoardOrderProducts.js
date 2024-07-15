import React from 'react';
import { useLocation } from 'react-router-dom';
import BackGroundColor from './BackGroundColor';

function DashBoardOrderProducts() {
    const location = useLocation();
    const { products } = location.state;
    BackGroundColor('#15161D', '/dashboard/allOrders/orderProducts');

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h1 style={{color: 'white'}} className='mt-5 mb-5'>user order products</h1>
                    <div className='table-container'>
                        <table className='carttable'>
                    <tr>
                        <th>name</th>
                        <th>Quantity</th>
                        <th>total Amount</th>
                    </tr>
                
                    {products.map((el) => (
                        <tr>
                            <td>{el.productId.name}</td>
                            <td>{el.quantity}</td>
                            <td>{(el.productId.price * el.quantity * 100) / 100}</td>
                        </tr>
                    ))}
                        </table>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default DashBoardOrderProducts;
