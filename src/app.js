const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("postman-request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs"); // set a value for a given express setting; setting up handlebars
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.get("route here or partial URL, example: /about", (object (req), response (res)) => {where we desccribe what we are gonna do when someone visits that particular route});

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Jamie Isabel",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Jamie Isabel",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "FAQ",
    name: "Jamie Isabel",
    question: "What's the essence of this application?",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          address: req.query.address,
          forecast: forecastData,
          location,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("help404", {
    title: "404",
    error: "Help article not found",
    name: "Jamie Isabel",
  });
});

// THIS ALWAYS COMES AT LAST
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found",
    name: "Jamie Isabel",
  });
});
// app.com
// app.com
// app.com/help
// app.com/about

// to start the server app
app.listen(port, () => {
  console.log("Server is up on port " + port + "!");
}); // listen to port 3000
