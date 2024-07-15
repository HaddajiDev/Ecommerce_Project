const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');


router.post('/', async (req, res) => {
    const { userId, products, totalAmount } = req.body;
    
    try {        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const updatedProducts = products.map(product => ({ ...product }));
        const productUpdates = [];
        for (const product of updatedProducts) {
            const productDetails = await Product.findById(product.productId);
            if (!productDetails) {
                return res.status(404).json({ error: `Product not found with id ${product.productId}` });
            }
            if (productDetails.stock < product.quantity) {
                product.quantity = productDetails.stock;
            }
            productDetails.stock -= product.quantity;
            productUpdates.push(productDetails.save());
        }

        
        const newOrder = new Order({
            userId,
            products: updatedProducts,
            totalAmount,
        });
        
        await newOrder.save();
        user.cart = [];
        user.orderHistory.push(newOrder._id);
        await user.save();

        // Save product updates
        await Promise.all(productUpdates);

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.get('/', async (req, res) => {
    const orders = await Order.find();
        
        // Fetch product details
        const productIds = orders.flatMap(order => order.products.map(product => product.productId));
        const products = await Product.find({ _id: { $in: productIds } });
        const productMap = products.reduce((map, product) => {
            map[product._id.toString()] = product;
            return map;
        }, {});
        
        const userIds = orders.map(order => order.userId);
        const users = await User.find({ _id: { $in: userIds } }).select('address email username');
        const userMap = users.reduce((map, user) => {
            map[user._id.toString()] = user;
            return map;
        }, {});
        
        const ordersWithDetails = orders.map(order => {
            const productsWithDetails = order.products.map(product => ({
                ...product.toObject(),
                productId: productMap[product.productId.toString()]
            }));
            return { 
                ...order.toObject(), 
                products: productsWithDetails, 
                user: userMap[order.userId.toString()]
            };
        });

        res.json({ orders: ordersWithDetails });
});


router.put('/:id', async(req, res) => {
    try {
        const order = await Order.findByIdAndUpdate({ _id: req.params.id }, { $set: {...req.body } }, {new: true});
        if (!order) return res.status(404).send();
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
})


module.exports = router;