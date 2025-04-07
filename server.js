import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import * as line from "@line/bot-sdk";

const config = {
  channelAccessToken: process.env.SECRETTOKEN,
  channelSecret: process.env.SECRETCODE,
};
// console.log("SECRETTOKEN:", process.env.SECRETTOKEN);
// console.log("SECRETCODE:", process.env.SECRETCODE);
// console.log(config);
app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all([req.body.events.map(handleEvents)]).then((result) => {
    res.json(result);
  });
});

const client = new line.Client(config);

client.pushMessage("U5b8fbde0d641e0506124acb40cc27109", [
  { type: "text", text: `test push` },
]);

const handleEvents = function (event) {
  console.log(event);
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }
  return client.replyMessage(event.replyToken, [
    {
      type: "text",
      text: `reply ${event.message.text}`,
    },
  ]);
};

app.get("/", (req, res) => {
  res.json("ok");
});

app.listen(3000, () => {
  console.log("starting server on port 3000");
});
