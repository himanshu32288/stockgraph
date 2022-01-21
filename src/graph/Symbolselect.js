import { useContext } from "react";
import { symbolContext } from "../Context/SymbolContext";
const Symbolselect = (props) => {
  const { setSymbol } = useContext(symbolContext);
  return (
    <>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              setSymbol("AAPL");
            }}
          >
            AAPL
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              setSymbol("MSFT");
            }}
          >
            MSFT
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              setSymbol("AMD");
            }}
          >
            AMD
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              setSymbol("TCS");
            }}
          >
            TCS
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              setSymbol("NS");
            }}
          >
            NS
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              setSymbol("BAC");
            }}
          >
            BAC
          </button>
        </li>
      </ul>
    </>
  );
};

export default Symbolselect;
