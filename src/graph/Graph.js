import "./Graph.css";
import { Chart } from "react-google-charts";
import { useState } from "react";
import { useHttpClient } from "../hook/http-hook";
import { useEffect } from "react";
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
    1: { type: "line", lineDashStyle: [1, 1] },
    2: { type: "bars" },
  },
  bar: { groupWidth: "100%" },
  chartArea: { top: 10 },
};
const Graph = (props) => {
  const [data, setData] = useState();
  const [macd, setMacd] = useState();
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const getData = async () => {
      let data;
      try {
        data = await sendRequest(
          `http://localhost:4000/api/stock/${props.symbol}`
        );
      } catch (err) {}

      setData(data["dailyData"]);
      setMacd(data["macd"]);
    };
    getData(props.symbol);
  }, [props.symbol, sendRequest]);
  return (
    <div className="graph-container">
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
    </div>
  );
};

export default Graph;
