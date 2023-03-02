require('dotenv').config();
require('./models/connection');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rolesRouter = require('./routes/roles');
var brandsRouter = require('./routes/brands');
var productsRouter = require('./routes/products');
var customersRouter = require('./routes/customers');
var mettingsRouter = require('./routes/mettings');

var app = express();

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
app.use('/mettings', mettingsRouter);

module.exports = app;
