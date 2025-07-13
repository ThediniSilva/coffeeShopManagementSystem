const express = require('express');
var cors = require('cors');
const connection= require('./connection');
const userRoute = require('./routes/user');
const cartRoute = require('./routes/cart'); // Path should match the location of cart.js
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product'); // Adjust the path if necessary
const orderRoutes = require("./routes/order");

const app = express();


app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/category',categoryRoute);
app.use('/product', productRoute);
app.use('/cart',cartRoute);
app.use("/api/orders", orderRoutes);
module.exports = app;