const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create a new product
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send({product: product});
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all products
router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send({products: products});
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send();
        res.status(200).send({product: product});
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate({ _id: req.params.id }, { $set: {...req.body } }, {new: true});
        if (!product) return res.status(404).send();
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send();
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/', async (req, res) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: null,
          categories: { $addToSet: { $toLower: "$category" } }
        }
      },
      {
        $project: {
          categories: 1,
          _id: 0
        }
      }
    ]);
    res.status(200).send({ categories: categories[0].categories });
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/highestprice/price', async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    maxPrice: { $max: "$price" },
                    minPrice: { $min: "$price" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    maxPrice: 1,
                    minPrice: 1
                }
            }
        ]);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'No price statistics found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  });


module.exports = router;
