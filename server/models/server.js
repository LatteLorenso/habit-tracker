const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Habit Tracker API is running");
});

const habitRoutes = require("../routes/habits.js");
app.use("/api/habits", habitRoutes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});