// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// POST /bfhl
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ error_message: "Invalid payload. 'data' must be an array." });
    }

    // Classify input
    const numbers = data.filter(item => !isNaN(item) && item !== "").map(Number);
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const specialChars = data.filter(item => !alphabets.includes(item) && isNaN(item));

    // Find highest alphabet (case-insensitive)
    const highestAlphabet = alphabets.length > 0
      ? [alphabets.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).slice(-1)[0]]
      : [];

    res.json({
      is_success: true,
      user_id: "nagaanjali_29082004",  // Replace with your format
      email: "nagaanjali@gmail.com",
      roll_number: "22BCE20425",
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
      special_characters: specialChars,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error_message: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
