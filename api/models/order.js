const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    state: {type: String, default: "Not Payed"}
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
