const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const alpha = require("alphavantage-fix")({ key: `${process.env.key}` });
const MACD = require("technicalindicators").MACD;
app.use(bodyParser.json({ limit: "16mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.get("/api/stock/:symbol", async (req, res, next) => {
  const symbol = req.params.symbol;
  let dailyData;
  try {
    await alpha.data.daily(symbol, "compact", "json").then((data) => {
      dailyData = data["Time Series (Daily)"];
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "faithing data failed" });
  }
  const macd_values = [];
  const candlestick_Data = [];
  try {
    for (const [key, value] of Object.entries(dailyData)) {
      macd_values.push(parseFloat(value["4. close"]));
      const temp = [];
      temp.push(key);
      temp.push(parseFloat(value["3. low"]));
      temp.push(parseFloat(value["1. open"]));
      temp.push(parseFloat(value["4. close"]));
      temp.push(parseFloat(value["2. high"]));
      candlestick_Data.push(temp);
    }
  } catch (err) {
    res.status(404).json({ message: "faithing data failed" });
  }
  candlestick_Data.push(["Date", "", "", "", ""]);
  candlestick_Data.reverse();
  macd_values.reverse();
  const macdInput = {
    values: macd_values,
    fastPeriod: 5,
    slowPeriod: 8,
    signalPeriod: 3,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  };

  const macd = MACD.calculate(macdInput);

  const macd_array = [];
  macd_array.push(["Date", "MACD", "MACD Histogram", "Signal Line"]);
  let i = 1;
  for (const x of macd) {
    const date = candlestick_Data[i][0];
    macd_array.push([date, x.MACD, x.histogram, x.signal]);
    i++;
  }
  res.json({ dailyData: candlestick_Data, macd: macd_array });
});

try {
  app.listen(4000);
} catch (err) {
  console.log(err);
}
