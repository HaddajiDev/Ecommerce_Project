const express = require('express');

const userRouter = express.Router();
const UserModal = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

const {loginRules, registerRules, validation, UpdateRules} = require('../middleware/validator');

const isAuth = require('../middleware/passport');

userRouter.get('/', async (requset, result) => {
	try {
        const users = await UserModal.find();
        result.status(200).send({users: users});
    } catch (error) {
        result.status(400).send({error});
    }
});

//register
userRouter.post("/register", registerRules(), validation, async (request, result) => {
    try {
        // Check if email exists
        const search = await UserModal.findOne({ email: request.body.email });
        if (search) {
            return result.status(400).send('Email already exists');
        }

        // Hash the password
        const salt = 10;
        const genSalt = await bcrypt.genSalt(salt);
        const hashed_password = await bcrypt.hash(request.body.password, genSalt);		

        // Create new user with hashed password
        let newUser = new UserModal({
            ...request.body,
            password: hashed_password
        });

        // Save new user
        let res = await newUser.save();

		//create token
		const payload = {
			_id: res._id
		}
		const token = await jwt.sign(payload, process.env.SCTY_KEY, {
			expiresIn: '7d'
		});

        result.status(200).send({ user: res, msg: "user added", token: `bearer ${token}` });
    } catch (error) {
        console.error(error);
        result.status(500).send('Failed');
    }
});


//login
userRouter.post('/login', loginRules(), validation, async (request, result) => {
    const { email, password } = request.body;
    try {
        // Await the result of findOne
        const searchedUser = await UserModal.findOne({ email });
        if (!searchedUser) {
            return result.status(400).send("User not found");
        }

        // Await the result of bcrypt.compare
        const match = await bcrypt.compare(password, searchedUser.password);

        if (!match) {
            return result.status(400).send("Invalid credentials");
        }       

		//create token
		const payload = {
			_id: searchedUser._id
		}
		const token = await jwt.sign(payload, process.env.SCTY_KEY, {
			expiresIn: '7d'
		});

        

        result.status(200).send({ user: searchedUser, msg: 'User logged in successfully', token: `bearer ${token}` });
    } catch (error) {
        console.error("Error during login:", error);
        result.status(500).send("Login Failed");
    }
});

userRouter.get('/current', isAuth(), (request, result) => {
    result.status(200).send({user: request.user});
});


userRouter.put('/:id', UpdateRules(), validation, async (request, result) => {
    try {
        let updatedUser = await UserModal.findByIdAndUpdate({ _id: request.params.id }, { $set: {...request.body } }, {new: true});
        result.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
    }
});

userRouter.post('/:id/cart', async (req, res) => {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).send({ error: 'Product ID and quantity are required' });
    }

    try {        
        const user = await UserModal.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        const cartItem = user.cart.find(item => item.productId.toString() === productId);
        if (cartItem) {
            if(product.stock > 0){
                cartItem.quantity += quantity;                
            }            
        } else {
            if(product.stock > 0){
                user.cart.push({ productId, quantity });                
            }            
        }

        await user.save();
        res.status(200).send({user: user});
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).send({ error: 'An error occurred' });
    }
});

userRouter.post('/:id/wishlist', async (req, res) => {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    try {        
        const user = await UserModal.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        const wishlistItem = user.wishlist.find(item => item.productId.toString() === productId);
        if (wishlistItem) {
            return res.status(400).json({ error: 'Product already in wishlist' });
        }

        user.wishlist.push({ productId });
        await user.save()

        res.status(200).json({ user: user });
        
    } catch (error) {
        console.error('Error adding item to wishlist:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

userRouter.get('/:id/order', async (req, res) => {
    const userId = req.params.id;
    
    try {        
        const user = await UserModal.findById(userId).select('orderHistory');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }        
        const orders = await Order.find({ _id: { $in: user.orderHistory } });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        
        const productIds = orders.flatMap(order => order.products.map(product => product.productId));
        
        const products = await Product.find({ _id: { $in: productIds } });
        
        const productMap = products.reduce((map, product) => {
            map[product._id] = product;
            return map;
        }, {});       
        
        const ordersWithProductDetails = orders.map(order => {
            const productsWithDetails = order.products.map(product => ({
                ...product.toObject(),
                productId: productMap[product.productId]
            }));
            return { ...order.toObject(), products: productsWithDetails };
        });
         
        res.json({ orders: ordersWithProductDetails });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


userRouter.delete('/:id', async (req, res) => {
    try {
        const user = await UserModal.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        await Order.deleteMany({ userId: user._id });
                
        await UserModal.findByIdAndDelete(req.params.id);

        res.status(200).send({ message: 'User and associated orders deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

userRouter.delete('/cart/:userId/:cartItemId', async (req, res) => {
    const { userId, cartItemId } = req.params;

    try {
        const user = await UserModal.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }        
        const cartItem = user.cart.find(item => item._id == cartItemId);

        user.cart.pull(cartItemId);

        await user.save();

        res.status(200).json({ message: 'Cart item deleted successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

userRouter.delete('/wishlist/:userId/:cartItemId', async (req, res) => {
    const { userId, cartItemId } = req.params;

    try {
        const user = await UserModal.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }        
        const cartItem = user.cart.find(item => item._id == cartItemId);

        user.wishlist.pull(cartItemId);

        await user.save();

        res.status(200).json({ message: 'Cart item deleted successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = userRouter;