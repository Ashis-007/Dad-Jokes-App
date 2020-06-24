import React, { useContext, useEffect } from "react";

import Vote from "./Vote";

import JokesContext from "../context";

import "../css/Joke.css";

const Joke = ({ joke, id, vote, smiley = "🙂" }) => {
  const [jokes, setJokes] = useContext(JokesContext);

  useEffect(() => {
    const setSmiley = () => {
      if (vote < 3) smiley = "🙂";
      // positive
      if (vote >= 3) smiley = "😀";
      if (vote >= 5) smiley = "😆";
      if (vote >= 8) smiley = "😂";
      if (vote >= 10) smiley = "🤣";
      // negative
      if (vote <= -3) smiley = "🤨";
      if (vote <= -5) smiley = "😑";
      if (vote <= -8) smiley = "😫";
      if (vote <= -10) smiley = "😡";

      let newJokes = [...jokes];
      newJokes.forEach((joke) => {
        if (joke.id === id) {
          joke.smiley = smiley;
        }
      });
      setJokes(newJokes);
    };

    setSmiley();
  }, [vote]);

  return (
    <div className="Joke">
      <Vote className="Joke__vote" vote={vote} id={id} />
      <div className="Joke__joke">
        <p>{joke}</p>
      </div>
      <div className="Joke__smiley">{smiley}</div>
    </div>
  );
};

export default Joke;
