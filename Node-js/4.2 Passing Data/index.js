import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//access the body of post request
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  // the body of the input??
  const numLetters = res.body["fName"].length + res.body["lName"].length;
  // need to send numLetters back to ejs
  res.render("index.ejs", {numOfLetters: numLetters});

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
