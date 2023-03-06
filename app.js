require('dotenv').config();
require('./models/connection');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rolesRouter = require('./routes/roles');
var brandsRouter = require('./routes/brands');
var productsRouter = require('./routes/products');
var customersRouter = require('./routes/customers');
var meetingsRouter = require('./routes/meetings');
var warehousesRouter = require('./routes/warehouses');
var apiRouter = require('./routes/api');

var app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload());

const cors = require ('cors');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/brands', brandsRouter);
app.use('/products', productsRouter);
app.use('/customers', customersRouter);
app.use('/meetings', meetingsRouter);
app.use('/warehouses', warehousesRouter);


module.exports = app;
