//Đây giống với chỗ hàm main
'use strict';

require('dotenv').load();
global.__base = process.cwd() + '/';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require(global.__base + 'app/config/database/redis-client');

// Body parser
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 604800 }
}));
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server is listening at port ' + port);
});
