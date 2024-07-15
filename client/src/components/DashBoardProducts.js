import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteProduct, GetAllproduct } from '../redux/ProductSlice';
import BackGroundColor from './BackGroundColor';

function DashBoardProducts() {
	
	const Products = useSelector((state) => state.product.products);
	const dispatch = useDispatch();    
	BackGroundColor('#15161D', '/DashBoardProducts');
    const handleDelete = async(id) =>{
      await dispatch(DeleteProduct(id));
	  setPing(!ping);
    }

	const [ping, setPing] = useState(false);
	useEffect(() => {
		dispatch(GetAllproduct());
	}, [ping]);

	const [searchValue, setValue] = useState('');

  return (
	<div className='container'>
		<div className='row'>
			<div className='col-12'>
				<h1 style={{color: 'white'}} className='mt-5 mb-3'>All products</h1>
				<div className='search-box mb-3'>
                    <input type='text'
                        placeholder='Search by name'
                        className='search-dash'
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <div className='searchicon'>
                        <i class="fa fa-search fa-2x" aria-hidden="true"></i>
                    </div>
                </div>
				<div className='table-container'>
					<table className='carttable'>
					<tr>
						<th>Product</th>
						<th>Catagory</th>
						<th>Price</th>
						<th>Stock</th>
						<th>Delete</th>
						<th>Update</th>
					</tr>
					{Products.filter((el) => el.name.toLowerCase().includes(searchValue.toLowerCase())).map((el) =>
						<tr>
							<td>{el.name}</td>
							<td>{el.category}</td>
							<td>{el.price}</td>
							<td>{el.stock}</td>
							<td><button onClick={() => handleDelete(el._id)}>Delete</button></td>
							<td><Link style={{all: 'unset'}} to='/DashBoardProducts/update' state={el}><button>Update</button></Link></td>
						</tr>
					)}
					</table>
				</div>
			</div>			
			
		</div>
		<div className='dash-button mb-5'>
			<div>
				<h1>Add new product</h1>
				<Link style={{all: 'unset'}} to='/DashBoardProducts/add'><button>Add Product</button></Link>
			</div>			
		</div>
		
	</div>
	
  )
}

export default DashBoardProducts