import React from "react";
import "../css/Vote.css";
const Vote = ({ vote = 0 }) => {
  const incrementVote = () => {};

  const decrementVote = () => {};

  return (
    <div className="Vote">
      <button className="btn Vote__btn" onClick={incrementVote}>
        <i className="fas fa-arrow-up"></i>
      </button>
      <div className="Vote__container">{vote}</div>
      <button className="btn Vote__btn" onClick={decrementVote}>
        <i className="fas fa-arrow-down"></i>
      </button>
    </div>
  );
};

export default Vote;
