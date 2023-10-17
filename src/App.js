import React, { useState } from "react";
import axios from "axios";

function App() {
  const [value1, setValue1] = useState("");
  const [key2, setKey2] = useState("");
  const [result, setResult] = useState("");

  const handleFetch = async () => {
    try {
      const response = await axios.post("http://localhost:8000/get_value", {
        value1: value1,
        key2: key2,
      });

      setResult(response.data.value);
    } catch (error) {
      setResult("Error: Value not found or key not found.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <h1>React App</h1>
      <input
        type="text"
        placeholder="Value1"
        value={value1}
        onChange={(e) => setValue1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Key2"
        value={key2}
        onChange={(e) => setKey2(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch Value</button>
      {result && <div>Result: {result}</div>}
    </div>
  );
}

export default App;
