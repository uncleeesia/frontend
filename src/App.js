import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("https://sim-assignment-csit314-9e613de15308.herokuapp.com/")
      .then(res => setMessage(res.data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Header></Header>
      <h1>React + Flask</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
