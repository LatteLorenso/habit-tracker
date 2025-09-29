const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/habits.json");

// Функция для чтения данных из файла JSON
const readHabits = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Функция для записи данных в файл JSON
const writeHabits = () => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// ===== Контроллеры =====

// GET /api/habits
const getHabits = (req, res) => {
  const habits = readHabits();
  res.json(habits);
};

// POST /api/habits
const addHabit = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400)/json({ error: "Name is required" })
  }

  const habits = readHabits();

  const newHabit = {
    id: Date.now(),
    name,
    completed: false
  };

  habits.push(newHabit);
  writeHabits(habits);

  res.status(201).json(newHabit);
};

// PATCH /api/habits/:id
const updateHabit = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const habits = readHabits();
  const habitIndex = habits.findIndex(h => h.id === parseInt(id));

  if (habitIndex === -1) {
    return res.status(404).json({ error: "Habit not found" });
  }
}

module.exports = { getHabits };