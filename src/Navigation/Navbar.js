import { useState } from "react";
import Symbolselect from "../graph/Symbolselect";
import Graph from "../graph/Graph";
const Navbar = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const changeSymbol = (newSymbol) => {
    setSymbol(newSymbol);
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ zIndex: 1 }}
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {symbol}
                </a>
                <Symbolselect changeNav={changeSymbol} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Graph symbol={symbol} />
    </>
  );
};

export default Navbar;
