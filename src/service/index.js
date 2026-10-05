const {sequelizeLoader} = require("@aarzoo-sharma-dev/gym-db");
const expressLoader = require("./express");
const routesLoader = require("./routes");

const service = async ({ app }) => {
  await sequelizeLoader({ app });
  await expressLoader({ app });
  await routesLoader({ app });
};

module.exports = service;
