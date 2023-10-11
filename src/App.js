import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [findings, setFindings] = useState([]);

  async function getMyData(search) {
    const response = await fetch(
      `http://localhost:3000/searchMyData?search=${search}`
    );
    const result = await response.json();
    return result;
  }

  const onHandleChange = (e) => {
    setName(e.target.value);
  };

  const onHandleSubmit = async () => {
    const _findings = await getMyData(name);
    console.log("myFindings", _findings);
    setFindings(_findings.data ?? []);
  };

  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", margin: "8px" }}
    >
      <input
        data-testid="input"
        value={name}
        onChange={onHandleChange}
        style={{ width: "100px", height: "25px" }}
      />
      <button
        data-testid="submit"
        onClick={onHandleSubmit}
        style={{
          width: "60px",
          height: "25px",
          marginTop: "20px",
        }}
      >
        Submit
      </button>

      {findings.length > 0 ? (
        <div data-testid="result">
          {findings.map((entity, index) => {
            return <div key={index}>{entity}</div>;
          })}
        </div>
      ) : (
        <div data-testid="noResult">No Search Result found</div>
      )}
    </div>
  );
}

export default App;
