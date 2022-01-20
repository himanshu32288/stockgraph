const Symbolselect = (props) => {
  const change = (newSymbol) => {
    props.changeNav(newSymbol);
  };
  return (
    <>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              change("AAPL");
            }}
          >
            AAPL
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              change("MSFT");
            }}
          >
            MSFT
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              change("AMD");
            }}
          >
            AMD
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              change("TCS");
            }}
          >
            TCS
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              change("NS");
            }}
          >
            NS
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              change("BAC");
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
