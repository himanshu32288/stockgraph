import "./Graph.css";
import { Chart } from "react-google-charts";
import { useState } from "react";
import { useHttpClient } from "../hook/http-hook";
import { useEffect } from "react";
import { useContext } from "react";
import { symbolContext } from "../Context/SymbolContext";
import { TailSpin } from "react-loader-spinner";
export const options = {
  legend: "none",
  bar: { groupWidth: "75%" },
  explorer: { axis: "horizontal", keepInBounds: true },
  candlestick: {
    fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
    risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
  },
  chartArea: { top: 40 },
};
export const macdoption = {
  title: "",
  vAxis: { title: "" },
  hAxis: { title: "" },
  lineWidth: 2,
  series: {
    0: { type: "Line" },
    1: { type: "bars" },
    2: { type: "line", lineDashStyle: [4, 4] },
  },
  bar: { groupWidth: "100%" },
  chartArea: { top: 10 },
};
const Graph = () => {
  const [data, setData] = useState();
  const [macd, setMacd] = useState();
  const { sendRequest } = useHttpClient();
  const [isLoading, setisLoading] = useState(true);
  const { symbol } = useContext(symbolContext);
  useEffect(() => {
    const getData = async (symbol) => {
      setisLoading(true);
      let data;
      try {
        console.log();
        data = await sendRequest(
         `https://deploy4ready.herokuapp.com/api/stock/${symbol}`
        );
      } catch (err) {}

      setData(data["dailyData"]);
      setMacd(data["macd"]);
      setisLoading(false);
    };
    getData(symbol);
  }, [symbol, sendRequest]);
  return (
    <>
      <div className="graph-container">
        {isLoading && (
          <TailSpin
            arialLabel="loading-indicator"
            color="red"
            radius={0}
            height={150}
            width={150}
            wrapperClass="spinner"
          />
        )}
        {!isLoading && (
          <>
            <Chart
              chartType="CandlestickChart"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
            <Chart
              chartType="ComboChart"
              width="100%"
              height="400px"
              data={macd}
              options={macdoption}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Graph;
