const express = require("express");
const app = express();
const port = 8000;
const db = require("./models");
db.sequelize.sync({ alter: true });
const cors = require("cors");

// Password untuk email
// voting123

// routes
const { authRoutes, voteRoutes } = require("./routes");

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/votings", voteRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));