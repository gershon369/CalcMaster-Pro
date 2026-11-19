import { useState } from "react";
import { Link } from "react-router-dom";


export default function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const formatResult = (number) => {
    if (!Number.isFinite(number)) return "Error";
    return String(Number(number.toFixed(8)));
  };

  const clearCalculator = () => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit) => {
    if (display === "Error" || waitingForOperand || display === "0") {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else if (display.length < 12) {
      setDisplay(display + digit);
    }
  };

  const inputDecimal = () => {
    if (display === "Error" || waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const performCalculation = (first, second, selectedOperator) => {
    switch (selectedOperator) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "×":
        return first * second;
      case "÷":
        return second === 0 ? null : first / second;
      default:
        return second;
    }
  };

  const chooseOperator = (nextOperator) => {
    const inputValue = Number(display);

    if (display === "Error") return;

    if (operator && !waitingForOperand) {
      const result = performCalculation(
        storedValue,
        inputValue,
        operator
      );

      if (result === null) {
        setDisplay("Error");
        setStoredValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }

      setDisplay(formatResult(result));
      setStoredValue(result);
    } else {
      setStoredValue(inputValue);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
  };

  const calculateResult = () => {
    if (operator === null || storedValue === null) return;

    const result = performCalculation(
      storedValue,
      Number(display),
      operator
    );

    setDisplay(result === null ? "Error" : formatResult(result));
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const deleteDigit = () => {
    if (display === "Error" || waitingForOperand) {
      setDisplay("0");
      setWaitingForOperand(false);
      return;
    }

    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  const calculatePercentage = () => {
    if (display !== "Error") {
      setDisplay(formatResult(Number(display) / 100));
      setWaitingForOperand(true);
    }
  };

  const numberButton =
    "h-14 rounded-xl bg-white/10 text-white text-xl font-semibold hover:bg-white/20 active:scale-95 transition";

  const operatorButton =
    "h-14 rounded-xl bg-purple-600/30 border border-purple-400/20 text-purple-300 text-xl font-bold hover:bg-purple-600/50 active:scale-95 transition";

  const actionButton =
    "h-14 rounded-xl bg-blue-500/20 text-blue-300 text-lg font-bold hover:bg-blue-500/30 active:scale-95 transition";

  const equalButton =
    "h-14 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-2xl font-bold hover:opacity-90 active:scale-95 transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080817] via-[#111126] to-[#1b1035] px-4 py-8 text-white">

      <div className="mx-auto max-w-md">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-white mb-8"
        >
          ← Back to Home
        </Link>

        <div className="mb-6 text-center">
          <p className="text-sm font-semibold tracking-widest text-purple-400">
            CALCMASTER PRO
          </p>

          <h1 className="mt-2 text-3xl font-extrabold">
            Basic Calculator
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Simple and easy everyday calculations.
          </p>
        </div>

        <div className="rounded-3xl border border-purple-400/20 bg-[#111126]/90 p-5 shadow-[0_0_40px_rgba(124,58,237,0.15)]">

          <div className="mb-5 flex min-h-28 flex-col items-end justify-end overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5">

            <p className="mb-2 text-sm text-slate-400">
              {storedValue !== null && operator
                ? String(storedValue) + " " + operator
                : "Ready to calculate"}
            </p>

            <p className="w-full overflow-hidden text-right text-4xl font-bold text-white">
              {display}
            </p>

          </div>

          <div className="grid grid-cols-4 gap-3">

            <button onClick={clearCalculator} className={actionButton}>
              AC
            </button>

            <button onClick={deleteDigit} className={actionButton}>
              DEL
            </button>

            <button onClick={calculatePercentage} className={actionButton}>
              %
            </button>

            <button onClick={() => chooseOperator("÷")} className={operatorButton}>
              ÷
            </button>

            <button onClick={() => inputDigit("7")} className={numberButton}>7</button>
            <button onClick={() => inputDigit("8")} className={numberButton}>8</button>
            <button onClick={() => inputDigit("9")} className={numberButton}>9</button>
            <button onClick={() => chooseOperator("×")} className={operatorButton}>×</button>

            <button onClick={() => inputDigit("4")} className={numberButton}>4</button>
            <button onClick={() => inputDigit("5")} className={numberButton}>5</button>
            <button onClick={() => inputDigit("6")} className={numberButton}>6</button>
            <button onClick={() => chooseOperator("-")} className={operatorButton}>−</button>

            <button onClick={() => inputDigit("1")} className={numberButton}>1</button>
            <button onClick={() => inputDigit("2")} className={numberButton}>2</button>
            <button onClick={() => inputDigit("3")} className={numberButton}>3</button>
            <button onClick={() => chooseOperator("+")} className={operatorButton}>+</button>

            <button
              onClick={() => inputDigit("0")}
              className={numberButton + " col-span-2"}
            >
              0
            </button>

            <button onClick={inputDecimal} className={numberButton}>.</button>
            <button onClick={calculateResult} className={equalButton}>=</button>

          </div>

        </div>

        <p className="mt-5 text-center text-xs text-slate-500">
          Free Calculator · CalcMaster Pro
        </p>

      </div>
    </div>
  );
}