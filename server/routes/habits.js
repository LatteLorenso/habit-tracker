const express = require("express");
const { getHabits } = require("../controllers/habitsController");

const router = express.Router();

router.get("/", getHabits);

module.exports = router;