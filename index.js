const express = require("express");
const app = express();

const morgan = require("morgan");

app.use(morgan("common"));

let topMovies = [
  {
    title: "Batman",
    genre: "action",
  },
  {
    title: "Spiderman",
    genre: "action",
  },
  {
    title: "Les Miserables",
    genre: "musical",
  },
  {
    title: "Mad Max",
    genre: "action",
  },
  {
    title: "Mean Girls",
    genre: "comedy",
  },
  {
    title: "Step Brothers",
    genre: "comedy",
  },
  {
    title: "The Ring",
    genre: "horror",
  },
  {
    title: "Scream",
    genre: "horror",
  },
  {
    title: "Resident Evil",
    genre: "horror",
  },
  {
    title: "Free Guy",
    genre: "comedy",
  },
];

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

// GET Welcome message for '/' request URL
app.get("/", (req, res) => {
  res.send("The secret to film is that it's an illusion.");
});

//give the static content in the documentation file
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

//error-handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
