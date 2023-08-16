import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

// custom middleware
function logger(req, res, next) {
  console.log("Request Method: ", req.method);
  console.log("Request Method: ", req.url);
  next();
}

app.use(logger);

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
