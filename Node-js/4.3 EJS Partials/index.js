import express from "express";

const app = express();
const port = 3000;

/* Write your code here:
Step 1: Render the home page "/" index.ejs
Step 2: Make sure that static files are linked to and the CSS shows up.
Step 3: Add the routes to handle the render of the about and contact pages.
  Hint: Check the nav bar in the header.ejs to see the button hrefs
Step 4: Add the partials to the about and contact pages to show the header and footer on those pages. */

// step 1
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// step 2: use express middleware to specify the location of public folder
app.use(express.static("public"));
  // so that in css href in header.ejs, the address is relative to public folder. ie. public/styles/content.css

// step 3: handle request for going to /about and /contact
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

//step 4: go into about.ejs and contact.ejs to <%- include(...)%>

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
