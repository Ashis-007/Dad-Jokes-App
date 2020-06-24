import React from "react";
import "./App.css";
import JokesList from "./components/JokesList";
import JokesProvider from "./JokesProvider";

function App() {
  return (
    <div className="App">
      <JokesProvider>
        <JokesList />
      </JokesProvider>
    </div>
  );
}

export default App;
