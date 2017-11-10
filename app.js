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
const apiRouter = require(global.__base + 'app/routes/api/index.js');
// Body parser
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.static(global.__base + '/app/views/public'));
app.use(express.static(global.__base + '/upload/images'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 604800 }
}));
const log = require(global.__base + 'app/controllers/middleware').log;
app.use('/', log);
app.get('/signup', (req, res) => {
    res.sendFile(global.__base + '/app/views/public/html/user.html');
});
app.use('/api', apiRouter);
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server is listening at port ' + port);
});