const express = require("express");
const expressLayouts = require("express-ejs-layouts");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // New

// Parse application/json
app.use(express.json()); // New

// Static Files
app.use(express.static("public"));

// Templating Engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const routes = require("./routes/user");
app.use("/", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
