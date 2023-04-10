const db = require("../models");
const { Voting, Candidate, History, sequelize, Sequelize } = db;
const randomStr = require("random-string-generator");

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
      const { name, description, start_date, end_date, candidate } = req.body;


      const newvoting = await Voting.create({
        vote_admin: req.user.id,
        name,
        description,
        start_date,
        end_date,
        join_code: randomStr(6, 'alphanumeric').toUpperCase()
      });


      const candidates = [...candidate].map(
        value => {
          return {
            name: value.name, voting_id: newvoting.voting_id
          }
        }
      );

      await Candidate.bulkCreate([...candidates]);

      return res.status(201).json({
        message: "New Voting Created"
      })
    }
    catch (error) {
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
        message: error.message
      })
    }
  },
  getVoteByCode: async (req, res) => {
    try {
      const { code } = req.params;
      let voted = false;
      const data = await Voting.findOne({
        where: {
          join_code: code
        }
      });
      console.log(data);

      const candidates = await Candidate.findAll({
        where: {
          voting_id: data.voting_id
        }
      });

      const checkHistory = await History.findOne({
        where: {
          voting_id: data.voting_id,
          user_id: req.user.id
        }
      });

      checkHistory ? voted = true : voted = false;

      return res.status(200).json({
        voting: data,
        candidates,
        voted
      });
    }
    catch (error) {
      return res.status(500).json({
        message: error.message
      })
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
      const voting = await Voting.findOne({
        where: {
          join_code: req.params.id
        }
      });

      const candidates = await Candidate.findAll({
        where: {
          voting_id: voting.voting_id,
        },
        order: Sequelize.literal("votes DESC")
      });

      const winner = candidates[0];

      return res.status(200).json({
        candidates,
        winner
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
  deleteVote: async (req, res) => {
    try {
      const voting = await Voting.findOne({
        where: {
          voting_id: req.params.id,
          vote_admin: req.user.id
        }
      });

      if (!voting.vote_admin) {
        return res.status(404).json({
          message: "Data not found"
        })
      }

      await Voting.destroy({
        where: {
          voting_id: req.params.id,
          vote_admin: req.user.id
        }
      });

      await Candidate.destroy({
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