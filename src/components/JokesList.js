import React, { useState, useEffect } from "react";
import axios from "axios";

import api from "../api";
import Joke from "./Joke";

import "../css/JokesList.css";

const JokesList = () => {
  const [jokes, setJokes] = useState([
    {
      joke: "",
      id: "",
      vote: 0,
      smiley: "🙂",
      // 🙂😀😆😂🤣
      // 🙂🤨😑😫😡
    },
  ]);
  const [numberOfJokes, setNumberOfJokes] = useState(10);

  useEffect(() => {
    const fetchJokes = () => {
      axios
        .get(`${api}/search?limit=${numberOfJokes}`, {
          headers: {
            Accept: "application/json",
          },
        })
        .then(({ data }) => {
          setJokes((jokes) => [...data.results]);
          localStorage.removeItem("jokes");
        });
    };

    fetchJokes();
  }, [numberOfJokes]);

  useEffect(() => {
    localStorage.setItem("jokes", JSON.stringify(jokes));
  }, [jokes]);

  const handleClick = () => {
    setNumberOfJokes((numberOfJokes) => numberOfJokes + 10);
  };

  console.log(jokes);

  return (
    <div className="JokeList">
      <div className="JokeList__sidebar">
        <h2 className="JokeList__sidebar__heading">
          Dad <span>Jokes</span>
        </h2>
        <div className="JokeList__sidebar__image">
          <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
        </div>
        <button className="btn JokeList__sidebar__btn" onClick={handleClick}>
          New Jokes
        </button>
      </div>
      <div className="JokeList__list">
        {jokes.map((joke, index) => (
          <Joke
            joke={joke.joke}
            key={index}
            id={joke.id}
            vote={joke.vote}
            smiley={joke.smiley}
          />
        ))}
      </div>
    </div>
  );
};

export default JokesList;
