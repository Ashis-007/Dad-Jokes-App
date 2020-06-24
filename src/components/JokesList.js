import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import api from "../api";
import Joke from "./Joke";

import JokesContext from "../context";

import "../css/JokesList.css";

const JokesList = () => {
  // jokes array from context
  const [jokes, setJokes] = useContext(JokesContext);

  const [loading, setLoading] = useState(false);
  const [numberOfJokes, setNumberOfJokes] = useState(10);

  // retreive numberOfJokes and jokes from localstorage
  // or create one if not present
  useEffect(() => {
    if (localStorage.getItem("numberOfJokes") !== null) {
      setNumberOfJokes(parseInt(localStorage.getItem("numberOfJokes")));
    } else {
      localStorage.setItem("numberOfJokes", JSON.stringify(numberOfJokes));
    }

    if (localStorage.getItem("jokes") !== null) {
      setJokes(JSON.parse(localStorage.getItem("jokes")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("numberOfJokes", JSON.stringify(numberOfJokes));

    const fetchJokes = () => {
      axios
        .get(`${api}/search?limit=${numberOfJokes}`, {
          headers: {
            Accept: "application/json",
          },
        })
        .then(({ data }) => {
          // if data > 10 then remove all jokes
          // except the last 10 jokes
          if (data.results.length !== 10) {
            data.results.splice(0, data.results.length - 10);
            console.log(data.results);
            setJokes((jokes) => [...jokes, ...data.results]);
          } else {
            //running for 1st time
            setJokes([...data.results]);
          }
        });
    };

    // start loading
    setLoading(true);

    // retreive jokes from localstorage if present
    // else fetch new ones
    if (localStorage.getItem("jokes") !== null) {
      let jokes = JSON.parse(localStorage.getItem("jokes"));
      if (jokes.length === numberOfJokes) {
        setJokes(jokes);
      }
      if (jokes.length < numberOfJokes) {
        fetchJokes();
      }
    } else {
      fetchJokes();
    }

    // finish loading
    setLoading(false);
  }, [numberOfJokes]);

  useEffect(() => {
    localStorage.setItem("jokes", JSON.stringify(jokes));
  }, [jokes]);

  // replace numberOfJokes in localstorage
  // and modify its state
  const handleClick = () => {
    localStorage.removeItem("numberOfJokes");
    setNumberOfJokes((numberOfJokes) => numberOfJokes + 10);
  };

  if (loading) {
    return (
      <div className="loading">
        <i className="far fa-8x fa-laugh fa-spin" />
        <h2 className="loading__title">Loading...</h2>
      </div>
    );
  } else {
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
  }
};

export default JokesList;
