const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
	email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    address: {
        street: { type: String, default:""},
        city: { type: String, default:"" },
        state: { type: String, default:""},
        postalCode: { type: String, default:"" },
        country: { type: String, default:"" }
    },
    orderHistory: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
    ],
    wishlist: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
        }        
    ],
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 }
        }
    ],
});

const UserModal	= mongoose.model("User", userSchema);

module.exports = UserModal;