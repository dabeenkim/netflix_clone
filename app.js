const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const app = express();
const PORT = 3020;

app.use(
  cors({
    "Access-Control-Allow-Origin": [
      "*",
      // "http://mini-project-myarchive.s3-website.ap-northeast-2.amazonaws.com/",
      // "http://localhost:3000"
    ], //프론트의 url
    credentials: true, //쿠키정책
    optionsSuccessStatus: 200,
    exposedHeaders: ["token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(` http://localhost:${PORT} `);
});
