import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import Swal from 'sweetalert2';

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

export const AddOrder = createAsyncThunk('order/add', async ({ userId, products, totalAmount }) => {
    try {
        let result = await axios.post('https://ecommerce-back-nknnimtn8-haddajidevs-projects.vercel.app/order/', { userId, products, totalAmount });
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const AllOrders = createAsyncThunk('order/all', async() => {
    try {
        let result = await axios.get('https://ecommerce-back-nknnimtn8-haddajidevs-projects.vercel.app/order/');
        return result;
    } catch (error) {
        console.log(error);
    }
});

export const UpdateOrder_Put = createAsyncThunk('order/all', async({id, state}) => {
    try {
        let result = await axios.put(`https://ecommerce-back-nknnimtn8-haddajidevs-projects.vercel.app/order/${id}`, state);
        return result;
    } catch (error) {
        console.log(error);
    }
});




const initialState = {
  orders: [],
  status: null,
  userOrder: []
}

export const productSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {      
    },
    extraReducers: (builder) => {
      builder     
    .addCase(AddOrder.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(AddOrder.fulfilled, (state, action) => {
        state.status = 'success';
        state.orders.push(action.payload);
        Alert('Order added');
    })
    .addCase(AddOrder.rejected, (state) => {
        state.status = 'failed';
    })

    .addCase(AllOrders.pending, (state) => {
        state.status = "pending";
    })
    .addCase(AllOrders.fulfilled, (state, action) => {
        state.status = "success"; 
        state.orders = action.payload.data.orders;       
    })
    .addCase(AllOrders.rejected, (state) => {
        state.status = "failed";
    })

    
  }    
})
  
  
  export const { } = productSlice.actions
  
  export default productSlice.reducer
  
  