const express = require("express");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const http = require("http");

const expressLoader = async ({ app }) => {
  const morganFormat = process.env.NODE_ENV === "development" ? "dev" : "tiny";
  app.version = `${process.env.npm_package_version} (${process.env.NODE_ENV})`;
  app.use(
    compression({
      filter: (req, res) => {
        if (req.headers["x-no-compression"]) return false;
        return compression.filter(req, res);
      },
    }),
  );
  app.use(cors({ origin: "*" }));
  app.disable("x-powered-by");
  app.use(morgan(morganFormat));
  app.use(helmet());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, enctype",
    );
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    );
    next();
  });

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: false }));
  app.http = http.Server(app);

  console.log("🖥️  Express initialized...");
};

module.exports = expressLoader;
