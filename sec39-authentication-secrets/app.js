//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// use passport to add cookies and sessions
/// init session
app.use(session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  }));

/// init passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

// with encrypt added
const userSchema = new mongoose.Schema(
    {
        email: String,
        password: String,
        secret: String
    }
);
// const secret = "ThisIsOurLittleSecret."; // secret is moved to .env file
// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['passwords']}); // only encrypt pw
// will automatically encrypt when calling save, and decrypt when calling find

// using passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// render login page
app.get("/login", function(req, res) {
    res.render("login.ejs");
});

// render register page
app.get("/register", function(req, res) {
    res.render("register.ejs");
});

// render home page
app.get("/", function(req, res) {
    res.render("home.ejs");
});


// register user and render secret page once registered
app.post("/register", function(req, res) {
    // // generate salt and hash
    // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    //     // Store hash in your password DB.
    //     const newUser = new User({
    //         email: req.body.username,
    //         password: hash
    //     });
    //     newUser.save()
    //         .then((user) => {
    //             res.render("secrets.ejs");
    //         })
    //         .catch((error) => {
    //             console.log(err);
    //         });
    // });
    User.register({username: req.body.username}, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(res, req, function() {
                res.redirect("secret.ejs");
            })
        }
    });
});

app.get("/secrets", function(req, res) {
    // // if user is authenticated, render secret page
    // if (req.isAuthenticated) {
    //     res.render("secrets.ejs");
    // } else {
    //     res.redirect("/login");
    // }

    // make sure the secret field is not null for all users
    User.find({"secret": {$ne: null}})
        .then((users) => {
            res.render("/secrets", {usersWithSecrets: users});
        })
        .catch((error) => {
            console.log(err);
        });
});

// after register, redirect to login page (check the credentials)
app.post("/login", function(req, res) {
    // const userName = req.body.username;
    // const pw = req.body.password;

    // User.findOne({email: userName})
    //     .then((user) => {
    //         bcrypt.compare(pw, user.password, function(err, result) {
    //             if (result === true) {
    //                 res.render("/secrets");
    //             }
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function(err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            })
        }
    });
});

// log out when session expire or user log out
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
})

// let user submit secret
app.get("/submit", function(req, res) {
    if (req.isAuthenticated) {
        res.render("submit.ejs");
    } else {
        res.redirect("/login");
    }
});

// handle submit post (when user hit submit)
app.post("/submit", function(req, res) {
    //save secret
    const submittedSecret = req.body.secret;
    // find user (via _id) and save the secret to their file (add to 'secret' field)
    User.findByID(req.user._id)
        .then((user) => {
            user.secret = submittedSecret;
            user.save();
            res.redirect("/secrets");
        })
        .catch((error) => {
            console.log(err);
        }); 

});


app.listen(3000, function() {console.log(`Server started on port 3000.`);})