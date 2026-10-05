const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
const service = require("./service");


const startServer = async () => {
  process.on("uncaughtException", (err) => {
    console.error("Error", err);
  });
  const app = express();

  await service({ app });

  const port = process.env.PORT || 7000;

  app.http.listen(port, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log(` server listening on port ${port}! 🎉`);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  });
};

startServer();
