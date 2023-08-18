//jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";

// const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

var postArr = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// render home page
app.get("/", (req, res) => {
  res.render("home.ejs", {
    startContent: homeStartingContent,
    posts: postArr
  });
});

// render about page
app.get("/about", (req, res) => {
  res.render("about.ejs", {about: aboutContent});
});

// render contact page
app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    contact: contactContent, 
  });
});

// render compose page
app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

// post request from compose's submit
app.post("/compose", function(req, res) {
  // create a JS object to store the content
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent
  };

  postArr.push(post);

  // redirected to home page after submit post
  res.redirect("/");
});

// challenge 16: dynamic url to get you to the page
app.get("/posts/:postName", function(req, res) {
  const requestedTitle = req.params.postName;
  // check this title against all titles in postArr
  postArr.forEach(function(post) {
    const storedTitle = post.title;
    if (_.lowerCase(requestedTitle) === _.lowerCase(storedTitle)) {
      console.log("Match found!");
      //if a match, render the post page
      res.render("post.ejs", {title: post.title, content: post.content});
    } else {
      console.log("Not a match!");
    }
  }) 
  
});











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
