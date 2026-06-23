import { useState } from "react";
import API from "../services/api";

function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState("");

  const calculateLoan = async () => {
    try {
      const res = await API.post("/loan", {
        amount,
        rate,
        tenure,
      });

      setResult(res.data.emi);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        placeholder="Loan Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        placeholder="Interest Rate"
        onChange={(e) => setRate(e.target.value)}
      />

      <input
        placeholder="Tenure"
        onChange={(e) => setTenure(e.target.value)}
      />

      <button onClick={calculateLoan}>
        Calculate
      </button>

      <h2>EMI: {result}</h2>
    </div>
  );
}

export default LoanCalculator;