//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
// no need to memorize this
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsAuthorized = false;

// use this whenever you want to get hold of info from HTML form
app.use(bodyParser.urlencoded({extended: true}));

//custom middleware for password check
function passwordCheck(req, res, next) {
    const password = req.body["password"]; // in index.js, password field has this particular name
    if (password === "ILoveProgramming") {
        userIsAuthorized = true;
    }
    next(); // remember to call callback func, flow to continue to handlers
}
app.use(passwordCheck);

// GET route to home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
}
);

// POST route to go to check page
app.post("/check", (req, res) => {
    if (userIsAuthorized) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});