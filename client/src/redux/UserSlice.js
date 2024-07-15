import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';





export const userRegister = createAsyncThunk("user/register", async(user)=>{
	try {
		let result = await axios.post('https://ecommerce-back-sandy.vercel.app//user/register', user);
		return await result;
	} catch (error) {
		console.log(error);
	}
});

export const userLogin = createAsyncThunk("user/login", async(user)=>{
	try {
		let result = await axios.post('https://ecommerce-back-sandy.vercel.app//user/login', user);		
		return await result;
	} catch (error) {
		console.log(error);
	}
});

export const currentUser = createAsyncThunk("user/current", async()=>{
	try {
		let result = await axios.get('https://ecommerce-back-sandy.vercel.app//user/current', {
			headers:{
				Authorization: localStorage.getItem("token"),
			}
		});
		return await result;
	} catch (error) {
		console.log(error);
	}
});

export const UpdateUser = createAsyncThunk('user/update', async ({ id, edited }, { rejectWithValue }) => {
    try {
        let result = await axios.put(`https://ecommerce-back-sandy.vercel.app//user/${id}`, edited);
        return result.data;
    } catch (error) {
        console.error('Error updating user:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const AddToCart = createAsyncThunk('user/cart', async({id, stuff}) => {
	try {
		let result = await axios.post(`https://ecommerce-back-sandy.vercel.app//user/${id}/cart`, stuff);
		return result;
	} catch (error) {
		console.log(error);
	}
});


export const AddToWishList = createAsyncThunk('user/wishlist', async({id, stuff_1}) => {
	try {
		let result = await axios.post(`https://ecommerce-back-sandy.vercel.app//user/${id}/wishlist`, stuff_1);
		return result.data;
	} catch (error) {
		console.log(error);
	}
});

export const getUserOrders = createAsyncThunk('user/order', async(id) => {
    try {
        let result = await axios.get(`https://ecommerce-back-sandy.vercel.app//user/${id}/order`);
		return result;
    } catch (error) {
        console.log(error);
    }
});

export const GetAllUsers = createAsyncThunk('user/all', async() => {
	try {
		let result = await axios.get('https://ecommerce-back-sandy.vercel.app//user/');
		return result;
	} catch (error) {
		console.log(error);
	}
});

export const DeleteUser = createAsyncThunk('user/delete', async(id) => {
	try {
		let result = await axios.delete(`https://ecommerce-back-sandy.vercel.app//user/${id}`);
		return result;
	} catch (error) {
		console.log(error);
	}
});

export const GetOrder = createAsyncThunk('user/one', async (id, { rejectWithValue }) => {
    try {
        let result = await axios.get(`https://ecommerce-back-sandy.vercel.app//user/${id}/order`);
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const RemoveCartItem = createAsyncThunk('user/cartDel', async({userId, cartId}) =>{
	try {
		await axios.delete(`https://ecommerce-back-sandy.vercel.app//user/cart/${userId}/${cartId}`);
	} catch (error) {
		console.log(error);
	}
})

export const RemoveWishListItem = createAsyncThunk('user/wishDel', async({userId, cartId}) =>{
	try {
		await axios.delete(`https://ecommerce-back-sandy.vercel.app//user/wishlist/${userId}/${cartId}`);
	} catch (error) {
		console.log(error);
	}
})

const initialState = {
  user: null,
  status: null,
  cart: 0,
  wishlist: 0,
  orders: [],
  users: [],
  userOrders: []
}

const calculateCartTotal = (user) => {
	return user?.cart.reduce((total, item) => total + item.quantity, 0) || 0;
};

const calculateWishListTotal = (user) => {
	return user?.wishlist.length || 0;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
	logout:(state, action) => {
		state.user = null;
		localStorage.removeItem("token");
	}
  },
  extraReducers: (builder) => {
	builder	
	
	//login
	.addCase(userLogin.pending, (state) => {
		state.status = "pending";
	})
	.addCase(userLogin.fulfilled, (state, action) => {
		state.status = "success";
		state.user = action.payload.data.user;
		state.cart = calculateCartTotal(state.user);
		localStorage.setItem("token", action.payload.data.token);
		Alert(`${state.user.username} logged in`);
	})
	.addCase(userLogin.rejected, (state) => {
		state.status = "failed";		
	})

	//signInup
	.addCase(userRegister.pending, (state) => {
		state.status = "pending";
	})
	.addCase(userRegister.fulfilled, (state, action) => {
		state.status = "success";
		state.user = action.payload.data.user;
		state.cart = calculateCartTotal(state.user);
		localStorage.setItem("token", action.payload.data.token);		
	})
	.addCase(userRegister.rejected, (state) => {
		state.status = "failed";
	})

	//Current
	.addCase(currentUser.pending, (state) => {
		state.status = "pending";
	})
	.addCase(currentUser.fulfilled, (state, action) => {
		state.status = "success";
		state.cart = calculateCartTotal(state.user);
		state.user = action.payload?.data.user;				
	})
	.addCase(currentUser.rejected, (state) => {
		state.status = "failed";
	})
	//Update user
	.addCase(UpdateUser.pending, (state) => {
		state.status = "pending";
	})
	.addCase(UpdateUser.fulfilled, (state, action) => {	
		state.user = action.payload;
		state.status = "success";
		Alert('Updated');
	})
	.addCase(UpdateUser.rejected, (state) => {
		state.status = "failed";
	})

	.addCase(AddToCart.pending, (state) => {
		state.status = "pending";
	})
	.addCase(AddToCart.fulfilled, (state, action) => {	
		state.user = action.payload.data.user;
		state.cart = calculateCartTotal(state.user);
		state.status = "success";
		Alert('Added to Cart');
	})
	.addCase(AddToCart.rejected, (state) => {
		state.status = "failed";
	})

	.addCase(AddToWishList.pending, (state) => {
		state.status = "pending";
	})
	.addCase(AddToWishList.fulfilled, (state, action) => {	
		if (action.payload && action.payload.user) {
			state.user = action.payload.user;
			state.wishlist = calculateWishListTotal(state.user);
			Alert('Added to wishlist');
		}
		state.status = "success";
	})
	.addCase(AddToWishList.rejected, (state) => {
		state.status = "failed";
	})


	.addCase(getUserOrders.pending, (state) => {
		state.status = "pending";
	})
	.addCase(getUserOrders.fulfilled, (state, action) => {	
		if (action.payload.data) {
			state.orders = action.payload.data.orders;			
		}
		state.status = "success";
	})
	.addCase(getUserOrders.rejected, (state) => {
		state.status = "failed";
	})


	.addCase(GetAllUsers.pending, (state) => {
		state.status = "pending";
	})
	.addCase(GetAllUsers.fulfilled, (state, action) => {	
		if (action.payload.data.users) {
			state.users = action.payload.data.users;
		}
		state.status = "success";
	})
	.addCase(GetAllUsers.rejected, (state) => {
		state.status = "failed";
	})

	.addCase(DeleteUser.pending, (state) => {
		state.status = "pending";
	})
	.addCase(DeleteUser.fulfilled, (state, action) => {	
		state.status = "success";
		Alert('User Deleted');		
	})
	.addCase(DeleteUser.rejected, (state) => {
		state.status = "failed";
	})

	.addCase(GetOrder.pending, (state) => {
        state.status = "pending";
    })
    .addCase(GetOrder.fulfilled, (state, action) => {
        state.status = "success"; 
        if (action.payload.orders) {
            state.userOrders = action.payload.orders;
        }         
    })
    .addCase(GetOrder.rejected, (state, action) => {
        state.status = "failed";
		state.userOrders = [];
		console.log(action.payload);
    })
  }
  
})

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

export const { logout } = userSlice.actions

export default userSlice.reducer

