//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//set up mongoDB
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

// GET route that fetches all the articles
app.get("/articles", function(req, res){
    // query and find all the articles in DB
    Article.find({}).then((results) => {
        if (!err) {
            res.send(results);
        } else {
            res.send(err);
        }
    });
});

// POST route that fetches one article
app.post("/articles", function(req, res){
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err) {
        if(!err) {
            res.send("Successfully sent new article");
        } else {
            res.send(err);
        }
    });
});

// DELETE route that deletes all
app.delete("/articles", function(req, res){
    Article.deleteMany({});
});

// PUT route: update THE aritcle
app.route("/articles/:articleTitle")
.get(function(req, res) {
    // read from db to look for the specific article
    const requestedTitle = req.params.articleTitle;
    Article.findOne({title: requestedTitle}).then(
        (results) => {
            if(!err) {
                res.send(requestedTitle);
            } else {
                res.send("No articles with the title are found.");
            }
    });
})
.put(function(req, res) {
    Article.findOneAndUpdate(
        {title: req.params.articleTitle}, //conditions
        {title: req.body.title, content: req.body.content}, //updates
        {overwrite: true}
    ).then((data) => {
        if (!err) {
            res.send("PUT update successful.");
        }
    })
})
.patch(function(req, res) {
    Article.findOneAndUpdate(
        {title: req.params.articleTitle},
        {$set: req.body} // if the user only updated certain fields, only those fields will show up
    ).then((data) => {
        if (!err) {
            res.send("Patch update successful.");
        }
    })
})
.delete(function(req, res) {
    Article.deleteOne(
        {title: req.params.articleTitle}
    ).then((data) => {
        if (!err) {
            res.send("Delete Successful.");
        }
    })
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});