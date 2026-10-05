const { models } = require("@aarzoo-sharma-dev/gym-db");
const { User } = models;
const login = (req, res) => {
  try {
    console.log("Login route accessed");
    const { username, password } = req.query;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    User.findOne({ where: { username, password } })
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ message: "Invalid username or password" });
        }
        res.status(200).json({ message: "Login successful", user });
      })
      .catch((error) => {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
};
