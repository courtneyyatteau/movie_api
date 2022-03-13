const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  uuid = require("uuid");

const app = express();

app.use(morgan("common"));

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    userName: "john",
    movieFavs: ["Batman", "Mean Girls"],
  },
];

let movies = [
  {
    title: "Batman",
    genre: {
      name: "action",
      description:
        "a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, and frantic chases.",
    },
    director: {
      name: "Reeves",
    },
  },
  {
    title: "Spider-man: Homecoming",
    genre: {
      name: "action",
      description:
        "a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, and frantic chases.",
    },
    director: {
      name: "Koepp",
    },
  },
  {
    title: "Mean Girls",
    genre: {
      name: "comedy",
      description:
        "a film genre designed to make the audience laugh through amusement.",
    },
    director: {
      name: "Waters",
    },
  },
  {
    title: "Step Brothers",
    genre: {
      name: "comedy",
      description:
        "a film genre designed to make the audience laugh through amusement.",
    },
    director: {
      name: "McKay",
    },
  },
  {
    title: "The Ring",
    genre: {
      name: "horror",
      description:
        "a film genre whose purpose is to create feelings of fear, dread, disgust, and terror in the audience",
    },
    director: {
      name: "Verbinski",
    },
  },
  {
    title: "Scream",
    genre: {
      name: "horror",
      description:
        "a film genre whose purpose is to create feelings of fear, dread, disgust, and terror in the audience",
    },
    director: {
      name: "Craven",
    },
  },
];

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("movie does not exist");
  }
});

app.get("/movies/genres/:genre", (req, res) => {
  const genre = movies.find(
    (movie) => movie.genre.name === req.params.genre
  ).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(404).send("genre does not exist");
  }
});

app.get("/movies/directors/:director", (req, res) => {
  const director = movies.find(
    (movie) => movie.director.name === req.params.director
  ).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(404).send("director does not exist");
  }
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  if (newUser.userName) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("A user needs a username.");
  }
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const newUserName = req.body;
  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = newUserName.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("nonexistent user");
  }
});

app.post("/users/:id/:movie", (req, res) => {
  const { id, movie } = req.params;
  let user = users.find((user) => user.id == id);

  if (user) {
    user.movieFavs.push(movie);
    res.status(200).send(`${movie} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("nonexistent user");
  }
});

app.delete("/users/:id/:movie", (req, res) => {
  const { id } = req.params;
  let user = users.find((user) => user.id == id);

  if (user) {
    user.movieFavs = user.movieFavs.filter((mov) => {
      return mov !== req.params.movie;
    });
    res
      .status(200)
      .send(
        req.params.movie + " was removed from " + user.id + "'s favorites list."
      );
  } else {
    res.status(404).send("nonexistent user");
  }
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => {
      return user.id !== req.params.id;
    });
    res.status(201).send(req.params.id + " was deleted.");
  } else {
    res.status(404).send("nonexistent user");
  }
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
