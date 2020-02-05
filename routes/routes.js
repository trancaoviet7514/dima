const DBConnection = require('../route/DBConnection')
module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/login', checkNotAuthenticated, function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
        console.log(`ok login`)
            //res.render('login.ejs');
    });

    app.post('/login', checkNotAuthenticated, passport.authenticate('local-login', {
            successRedirect: '/personalPage',
            failureRedirect: '/login',
            failureFlash: true
        }),
        function(req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    app.get('/signup', checkNotAuthenticated, function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
        console.log(`oke get sigup`)
            //res.render('signup.ejs');
    });

    app.post('/signup', checkNotAuthenticated, passport.authenticate('local-signup', {
        successRedirect: '/personalPage',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    // app.get('/personalPage', isLoggedIn, function(req, res) {
    //     res.render('personalPage.ejs', {
    //         user: req.user
    //     });
    // });
    app.get("/personalPage", isLoggedIn, function(req, res) {
        var getAllBookStr = "select * from book";
        DBConnection.query(getAllBookStr, function(err, results) {
            if (err) throw err;
            res.render("personalPage", { products: results.rows });
        });
        res.render('personalPage.ejs', {
            user: req.user
        });
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return next()
}