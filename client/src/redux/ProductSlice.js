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


export const GetAllproduct = createAsyncThunk('product/getAll', async() => {
    try {
        let result = await axios.get('http://localhost:5000/product/all');
        return result;
    } catch (error) {
        console.log(error);
    }
});

export const GetAllcategories = createAsyncThunk('product/getcategories', async() => {
  try {
      let result = await axios.get('http://localhost:5000/product/');
      return result.data;
  } catch (error) {
      console.log(error);
  }
});

export const getProdutById = createAsyncThunk('/product/productid', async(id) => {
  try {
    let result = await axios.get(`http://localhost:5000/product/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
});

export const getProdutById_Wish = createAsyncThunk('/product/productidWish', async(id) => {
  try {
    let result = await axios.get(`http://localhost:5000/product/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
});


export const PostProduct = createAsyncThunk('product/add', async(product) =>{
  try {
    let result = await axios.post(`http://localhost:5000/product/`, product);
    return result;
  } catch (error) {
    console.log(error);
  }
});

export const DeleteProduct = createAsyncThunk('product/delete', async(id) => {
  try {
    let result = await axios.delete(`http://localhost:5000/product/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
});

export const UpdateProduct_Put = createAsyncThunk('product/update', async({id, newProduct}) => {
  try {
    let result = await axios.put(`http://localhost:5000/product/${id}`, newProduct);
    return result.data;
  } catch (error) {
    console.log(error);
  }
});

export const GetHighestPrice = createAsyncThunk('product/getHighestPrice', async () => {
  try {
      let result = await axios.get('http://localhost:5000/product/highestprice/price');
      return result.data;
  } catch (error) {
      console.log(error);
  }
});

const initialState = {
  products: null,
  status: null,
  categories: null,
  highestPrice: 0,
  lowestPrice: 0,
  cartProduct: [],
  wishlistProduct: [],
  priceStats: [],
}
  
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {      
    },
    extraReducers: (builder) => {
      builder     
      .addCase(GetAllproduct.pending, (state) => {
		    state.status = "pending";
	    })
      .addCase(GetAllproduct.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload.data.products;
      })
      .addCase(GetAllproduct.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(GetAllcategories.pending, (state) => {
		    state.status = "pending";
	    })
      .addCase(GetAllcategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload.categories;        
      })
      .addCase(GetAllcategories.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(getProdutById.pending, (state) => {
		    state.status = "pending";
	    })
      .addCase(getProdutById.fulfilled, (state, action) => {
        state.status = "success";
        const product = action.payload.data.product;
        const exists = state.cartProduct.find(item => item._id === product._id);
        if (!exists) {
          state.cartProduct.push(product);
        }
      })
      .addCase(getProdutById.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(getProdutById_Wish.pending, (state) => {
		    state.status = "pending";
	    })
      .addCase(getProdutById_Wish.fulfilled, (state, action) => {
        state.status = "success";
        const product = action.payload.data.product;
        const exists = state.wishlistProduct.find(item => item._id === product._id);
        if (!exists) {
          state.wishlistProduct.push(product);
        }
      })
      .addCase(getProdutById_Wish.rejected, (state) => {
        state.status = "failed";
      })


      .addCase(PostProduct.pending, (state) => {
		    state.status = "pending";
	    })
      .addCase(PostProduct.fulfilled, (state, action) => {
        state.status = "success"; 
        Alert('Product added');
      })
      .addCase(PostProduct.rejected, (state) => {
        state.status = "failed";
      })


      .addCase(DeleteProduct.pending, (state) => {
		    state.status = "pending";
	    })
      .addCase(DeleteProduct.fulfilled, (state) => {
        state.status = "success";  
        Alert('Product deleted');
      })
      .addCase(DeleteProduct.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(UpdateProduct_Put.pending, (state) => {
		    state.status = "pending";
	    })
      .addCase(UpdateProduct_Put.fulfilled, (state, action) => {
        state.status = "success";        
        const updatedProduct = action.payload;        
        state.products = state.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
        Alert('Product updated');
      })
      .addCase(UpdateProduct_Put.rejected, (state) => {
        state.status = "failed";
      })


      .addCase(GetHighestPrice.pending, (state) => {
        state.status = "pending";
      })
      .addCase(GetHighestPrice.fulfilled, (state, action) => {
        state.status = 'success';
        state.priceStats = action.payload;
        if (action.payload.length > 0) {
          const { maxPrice, minPrice } = action.payload[0];
          state.highestPrice = maxPrice;
          state.lowestPrice = minPrice;
        }   
          
      })
      .addCase(GetHighestPrice.rejected, (state) => {
        state.status = "failed";
      })
  }    
})
  
  
  export const { } = productSlice.actions
  
  export default productSlice.reducer
  
  