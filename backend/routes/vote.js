const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const routes = require("express").Router();

const { verifyToken, checkPrivilege } = require("../middleware/auth");
const { voteController } = require("../controller");

// POST routes
routes.post("/", verifyToken, voteController.newVote);
routes.post("/:id/candidates", verifyToken, checkPrivilege, voteController.addCandidate);
routes.post("/vote", verifyToken, voteController.voteFor);
routes.post("/:id/finish", verifyToken, checkPrivilege, voteController.finish);

// GET routes
routes.get("/", verifyToken, voteController.dataList);
routes.get("/:code", verifyToken, voteController.getVoteByCode);
routes.get("/:id/candidates", verifyToken, voteController.candidateList);
// routes.get("/:id/winner", verifyToken, voteController.getWinner);

// DELETE routes
routes.delete("/:id", verifyToken, checkPrivilege, voteController.deleteVote);

module.exports = routes;