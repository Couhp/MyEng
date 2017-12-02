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
const router = require(global.__base + 'app/routes/index.js');
const isUser = require(global.__base + 'app/controllers/middleware/isUser.js');
const deserializeUser = require(global.__base + 'app/controllers/middleware/deserializeUser.js');
// Body parser
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.static(global.__base + '/upload'));
app.use(express.static(global.__base + '/app/views/public'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 604800 }
}));
const log = require(global.__base + 'app/controllers/middleware').log;
app.use('/', log);
app.use('/', router);
app.get('/abc', isUser, deserializeUser, (req, res) => {
    res.sendFile(global.__base + '/app/views/public/html/user.html');
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server is listening at port ' + port);
});