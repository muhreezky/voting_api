const db = require("../models");
const { Voting, Candidate, History, Sequelize } = db;

const voteControl = {
  // Fungsi untuk memilih kandidat yang tersedia dengan memasukkan id candidate dan id voting
  voteFor: async (req, res) => {
    const { voting_id, candidate_id } = req.body;
    const candidate = await Candidate.findOne({
      where: {
        candidate_id
      }
    });

    const checkHistory = await History.findOne({
      where: {
        voting_id,
        user_id: req.user.id
      }
    });

    if (checkHistory) {
      return res.status(403).json({
        message: "Users only can vote once"
      })
    }

    await History.create({
      voting_id,
      user_id: req.user.id
    })

    await Candidate.increment(
      {
        votes: 1
      },
      {
        where: {
          candidate_id
        }
      }
    );

    return res.status(201).json({
      message: `Voted for ${candidate.name}`
    });
  },
  // Membuat voting baru
  newVote: async (req, res) => {
    try {
      const { name, description } = req.body;

      await Voting.create({
        vote_admin: req.user.id,
        name,
        description
      });

      return res.status(201).json({
        message: "New Voting Created"
      })
    } catch (error) {
      return res.status(500).json({
        message: error
      });
    }
  },
  /**
   * @description Menambahkan kandidat baru ke dalam voting
   * @param {*} req 
   * @param {*} res 
   * @returns JSON Message
   */
  addCandidate: async (req, res) => {
    try {
      const { name, description } = req.body;
      await Candidate.create({
        name, description, voting_id: req.params.id
      });

      return res.status(201).json({
        message: "Candidate Added"
      });
    } catch (error) {
      return res.status(500).json({
        message: error
      })
    }
  },
  getVoteById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Voting.findOne({
        where: {
          voting_id: id
        }
      });

      return res.status(200).json({
        data
      });
    } catch (error) {

    }
  },
  dataList: async (req, res) => {
    try {
      const data = await Voting.findAll({
        where: {
          vote_admin: req.user.id
        }
      });

      return res.status(200).json({
        data
      });
    } 
    catch (error) {
      return res.status(500).json({
        message: error
      });
    }
  },
  endVote: async (req, res) => {
    try {
      await Voting.update(
        { active: false },
        {
          where: {
            voting_id: req.params.id
          }
        }
      );

      return res.status(200).json({
        message: "Vote Ended"
      });
    }
    catch (error) {
      return res.status(500).json({
        message: error
      })
    }
  },
  candidateList: async (req, res) => {
    try {
      const candidates = await Candidate.findAll({
        where: {
          voting_id: req.params.id
        }
      });

      return res.status(200).json({
        candidates
      });
    } 
    catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  },
  finish: async (req, res) => {
    try {
      await Voting.update(
        { active: false },
        {
          where: {
            voting_id: req.params.id
          }
        }
      );
    } 
    catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  },
  getWinner: async (req, res) => {
    try {
      const voting = await Voting.findOne(
        {
          where: {
            voting_id: req.params.id
          }
        }
      );
      if (voting.active) {
        return res.status(404).json({
          message: "The voting isn't over yet"
        })
      }
      const winner = await Candidate.max("votes", {
        where: {
          voting_id: req.params.id
        }
      });

      return res.status(200).json({
        winner
      })
    } 
    catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  },
  deleteVote: async (req, res) => {
    try {
      await Voting.destroy({
        where: {
          voting_id: req.params.id
        }
      });

      return res.status(200).json({
        message: "Deleted successfully"
      })
    } 
    catch (error) {
      return res.status(500).json({
        message: error.message
      })  
    }
  }
};

module.exports = voteControl;