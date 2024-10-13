const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Inicjalizacja serwera i ustawienia
const app = express();
app.use(cors());
app.use(express.json());

// Podłączenie do MongoDB
mongoose
  .connect("mongodb://localhost:27017/accountsDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Połączono z MongoDB"))
  .catch((error) => console.error("Błąd połączenia z MongoDB:", error));

// Definicja modelu użytkownika
const accountSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const Account = mongoose.model("Account", accountSchema);

// Endpoint do pobrania wszystkich kont
app.get("/api/accounts", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera" });
  }
});

// Endpoint do dodawania nowego konta
app.post("/api/accounts", async (req, res) => {
  const { username, password, email } = req.body;
  const newAccount = new Account({ username, password, email });

  try {
    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: "Błąd dodawania konta" });
  }
});

// Endpoint do usuwania konta
app.delete("/api/accounts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Account.findByIdAndDelete(id);
    res.json({ message: "Konto usunięte" });
  } catch (error) {
    res.status(500).json({ message: "Błąd usuwania konta" });
  }
});

// Start serwera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));