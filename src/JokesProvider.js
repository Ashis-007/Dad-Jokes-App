import React, { useState } from "react";
import JokesContext from "./context";

const JokesProvider = (props) => {
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

  return (
    <JokesContext.Provider value={[jokes, setJokes]}>
      {props.children}
    </JokesContext.Provider>
  );
};

export default JokesProvider;
