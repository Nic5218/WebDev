//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

// with encrypt added
const userSchema = new mongoose.Schema(
    {
        email: String,
        password: String
    }
);
// const secret = "ThisIsOurLittleSecret."; // secret is moved to .env file
userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['passwords']}); // only encrypt pw
// will automatically encrypt when calling save, and decrypt when calling find

const User = new mongoose.model("User", userSchema);

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
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save()
        .then((user) => {
            res.render("secrets.ejs");
        })
        .catch((error) => {
            console.log(err);
        });
});

// after register, redirect to login page (check the credentials)
app.post("/login", function(req, res) {
    const userName = req.body.username;
    const pw = req.body.password;

    User.findOne({email: userName,})
        .then((user) => {
            if (user.password === pw) {
                res.render("secrets.ejs");
            }
        })
        .catch((err) => {
            console.log(err);
        })
});




app.listen(3000, function() {console.log(`Server started on port 3000.`);})