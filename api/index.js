const express = require("express");
const app = express();
app.use(express.json());

const cors = require('cors');



require('dotenv').config();

const connect = require('./db_connect');
connect();
app.use(cors());
app.use("/user", require("./routes/user"));
app.use('/product', require("./routes/product"));
app.use('/order', require("./routes/order"));

const PORT = process.env.PORT;

app.get("/", (req, res) => res.send("Express on Vercel"));



app.listen(PORT, (err) =>{
	err ? console.log(err) : console.log(`Server running on port ${PORT}`);
});