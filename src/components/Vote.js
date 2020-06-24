import React, { useContext } from "react";

import JokesContext from "../context";

import "../css/Vote.css";

const Vote = ({ vote = 0, id }) => {
  const [jokes, setJokes] = useContext(JokesContext);

  const getBorderColor = () => {
    let color = "#BB2CD9";
    if (vote >= 5) color = "#ffeb3b";
    if (vote >= 8) color = "#cddc39";
    if (vote >= 10) color = "#8bc34a";
    // negative
    if (vote <= -5) color = "#ffc107";
    if (vote <= -8) color = "#ff9800";
    if (vote <= -10) color = "#f44336";

    return color;
  };

  const changeVote = (change) => {
    let newJokes = [...jokes];
    newJokes.forEach((joke) => {
      if (joke.id === id) {
        joke.vote = change === "increase" ? vote + 1 : vote - 1;
      }
    });
    setJokes(newJokes);
  };

  return (
    <div className="Vote">
      <button className="btn Vote__btn" onClick={() => changeVote("increase")}>
        <i className="fas fa-arrow-up"></i>
      </button>
      <div
        className="Vote__container"
        style={{ border: `2px solid ${getBorderColor()}` }}
      >
        <span>{vote}</span>
      </div>
      <button className="btn Vote__btn" onClick={() => changeVote("decrease")}>
        <i className="fas fa-arrow-down"></i>
      </button>
    </div>
  );
};

export default Vote;
