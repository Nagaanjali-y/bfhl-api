// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send(" BFHL API is running! Use POST /bfhl");
});


app.post("/bfhl", (req, res) => {
  try {
    const inputArray = req.body.data;

    if (!Array.isArray(inputArray)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input. 'data' must be an array."
      });
    } 
    const numbers = inputArray.filter(item => /^\d+$/.test(item));
    const odd_numbers = numbers.filter(n => parseInt(n) % 2 !== 0).map(String);
    const even_numbers = numbers.filter(n => parseInt(n) % 2 === 0).map(String);
    const alphabets = inputArray.filter(item => /^[a-zA-Z]+$/.test(item)).map(ch => ch.toUpperCase());
    const special_characters = inputArray.filter(item => !/^[a-zA-Z0-9]+$/.test(item));
    const sum = numbers.reduce((acc, n) => acc + parseInt(n), 0).toString();
    const lettersOnly = inputArray.filter(item => /^[a-zA-Z]+$/.test(item)).join("");
    let concatString = "";
    let toggle = true;
    for (let ch of lettersOnly.split("").reverse()) {
      concatString += toggle ? ch.toUpperCase() : ch.toLowerCase();
      toggle = !toggle;
    }
    res.json({
      is_success: true,
      user_id: "nagaanjali_yetukuri_24082004",
      email: "nagaanjaliyaetukuri@gmail.com",
      roll_number: "22BCE20425",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum,
      concat_string: concatString
    });
  } catch (error) {
    console.error("Error in /bfhl:", error);
    res.status(500).json({
      is_success: false,
      error: "Internal Server Error"
    });
  }
});

// 🔥 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
