import express from "express";

const app = express();
const port = 2000;


app.get("/", (req, res) => {
    console.log(req.rawHeaders);
    res.send("<h1> Hello </h1>");
});

app.get("/About", (req, res) => {
    res.send("<h2> About Me </h2> <p> My name is Nik. </p>");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);

})