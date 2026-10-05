const routesLoader = async ({ app }) => {
  app.use("/", require("../routes"));
  console.log("🚏 Routes initialized...");
};

module.exports = routesLoader;
