import React from 'react'
import { useSelector } from 'react-redux';

import {Outlet, Navigate} from 'react-router-dom'

function OrdersPrivate() {
    const currentUser = useSelector((state) => state.user.user);
    return currentUser?.orderHistory.length > 0 ? <Outlet /> : <Navigate to='/'/>
}

export default OrdersPrivate