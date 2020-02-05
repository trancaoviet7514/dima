const DBConnection = require('./DBConnection')
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        console.log(user)
        console.log(user.uid)
        done(null, user.uid);
    });

    passport.deserializeUser(function(uid, done) {
        DBConnection.query("SELECT * FROM users WHERE uid = $1 ", [uid],
            function(err, user) {
                done(err, user.rows[0]);
            });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req, username, password, done) {
                DBConnection.query("SELECT * FROM users WHERE username = $1 ", [username], function(err, result) {
                    if (err)
                        return done(err);
                    if (result.rowCount) {
                        console.log(`Tai khoan da ton tai`)
                        return done(null, false, req.flash('signupMessage', 'That is already taken'));
                    } else {
                        var newUserMysql = {
                            username: username,
                            password: bcrypt.hashSync(password, null, null),
                        };

                        var insertQuery = "INSERT INTO users (username, password) values ($1, $2)";

                        DBConnection.query(insertQuery, [newUserMysql.username, newUserMysql.password],
                            function(err, result) {
                                console.log('Insert thanh cong')
                            });
                        DBConnection.query("SELECT * FROM users WHERE username = $1 ", [newUserMysql.username],
                            function(err, result) {
                                newUserMysql.uid = result.rows[0].uid;
                                return done(null, newUserMysql);
                            });

                    }
                });
            })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req, username, password, done) {
                DBConnection.query("SELECT * FROM users WHERE username = $1 ", [username],
                    function(err, result) {
                        if (err)
                            return done(err);
                        if (!result.rowCount) {
                            console.log('sai tai khoan')
                            return done(null, false, req.flash('loginMessage', 'No User Found'));
                        }
                        if (!bcrypt.compareSync(password, result.rows[0].password)) {
                            console.log('sai mat khau')
                            return done(null, false, req.flash('loginMessage', 'Wrong Password'));
                        }
                        return done(null, result.rows[0]);
                    });
            })
    );
};