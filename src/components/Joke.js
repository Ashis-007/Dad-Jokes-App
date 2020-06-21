import React from "react";

import Vote from "./Vote";
import Smiley from "./Smiley";

import "../css/Joke.css";

const Joke = ({ joke, id, vote, smiley = "🙂" }) => {
  return (
    <div className="Joke">
      <Vote className="Joke__vote" vote={vote} />
      <div className="Joke__joke">
        <p>{joke}</p>
      </div>

      <div className="Joke__smiley">{smiley}</div>
    </div>
  );
};

export default Joke;
