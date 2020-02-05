const express = require('express')
var session = require('express-session');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const bodyParser = require('body-parser')
const app = express()

const router = require('./router')
const productrouter = require('./route/product')
    //const userrouter = require('./route/user')

var passport = require('passport');
var flash = require('connect-flash');

require('./route/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'justasecret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/routes.js')(app, passport);

app.use(router, productrouter)

app.listen(process.env.PORT || 3000, function() {
    console.log('Dima server listening on port 3000!')
})