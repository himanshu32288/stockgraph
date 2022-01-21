import "./App.css";
import { symbolContext } from "./Context/SymbolContext";
import Navbar from "./Navigation/Navbar";
import Graph from "./graph/Graph";
import { useState } from "react";
function App() {
  const [symbol, setSymbol] = useState("AAPL");
  return (
    <>
      <symbolContext.Provider
        value={{
          symbol,
          setSymbol,
        }}
      >
        <Navbar />
        <Graph />
      </symbolContext.Provider>
    </>
  );
}

export default App;
