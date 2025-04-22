const express = require("express");
const router = express.Router();
const rankingController = require("../controllers/controladorRanking");

router.get("/ranking", rankingController.getRanking);
router.get("/ranking-page", rankingController.getRankingPage);

module.exports = router;
