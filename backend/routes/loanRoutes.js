const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { amount, rate, tenure } = req.body;

  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;

  const emi =
    (amount *
      monthlyRate *
      Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  res.json({
    emi: emi.toFixed(2),
  });
});

module.exports = router;