const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Fixed import style

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb://localhost:27017/sece/expenses"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: String, required: true },
  date: { type: String, required: true },
});

const Expense = mongoose.model("Expense", expenseSchema);

app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find(); // Fetch all expenses from the database
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses", error: err });
  }
});

app.get("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOne({ id }); // Find expense by id
    if (!expense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expense", error: err });
  }
});

app.post("/api/expenses", async (req, res) => {
  const { name, amount, date } = req.body;
  const newExpense = new Expense({
    id: uuidv4(),
    name,
    amount,
    date,
  });

  try {
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense); // Send response after saving
  } catch (err) {
    res.status(500).json({ message: "Error saving expense", error: err });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
