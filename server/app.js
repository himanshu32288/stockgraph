const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const alpha = require("alphavantage-fix")({ key: "117SC2OV9DXCHD05" });
const MACD = require("technicalindicators").MACD;
const mongoose = require("mongoose");
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
  let stock_data;
  await alpha.data.daily(symbol, "compact", "json").then((data) => {
    stock_data = data;
  });
  const dailyData = stock_data["Time Series (Daily)"];
  const macd_values = [];
  const candlestick_Data = [];
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
  console.log(macd);
  const macd_array = [];
  macd_array.push(["Date", "MACD", "Signal Line", "MACD Histogram"]);
  let i = 1;
  for (const x of macd) {
    const date = candlestick_Data[i][0];
    macd_array.push([date, x.MACD, x.histogram, x.signal]);
    i++;
  }
  res.json({ dailyData: candlestick_Data, macd: macd_array });
});

mongoose
  .connect(
    `mongodb+srv://himanshu20:xtreme20@cluster0.dumxb.mongodb.net/myt?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
