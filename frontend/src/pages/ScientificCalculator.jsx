
import { useState } from "react";
import { Link } from "react-router-dom";

// Convert scientific expression into tokens.
function tokenize(source) {
  const pattern =
    /\s*(?:(\d+(?:\.\d*)?|\.\d+)(?:[eE]([+-]?\d+))?|([A-Za-zπ]+)|(\*\*|[+\-*/^()%!,]))/y;

  const tokens = [];
  let position = 0;
  const text = source.trim();

  while (position < text.length) {
    pattern.lastIndex = position;

    const match = pattern.exec(text);

    if (!match) {
      throw new Error("Invalid expression");
    }

    position = pattern.lastIndex;

    if (match[1] !== undefined) {
      tokens.push({
        type: "number",
        value: Number(match[1] + (match[2] ? `e${match[2]}` : "")),
      });
    } else if (match[3] !== undefined) {
      tokens.push({
        type: "name",
        value: match[3].toLowerCase(),
      });
    } else {
      tokens.push({
        type: "operator",
        value: match[4] === "**" ? "^" : match[4],
      });
    }
  }

  return tokens;
}

// Safe scientific expression parser.
function evaluateScientificExpression(source, angleMode) {
  const tokens = tokenize(source);
  let position = 0;

  const peek = (value) => tokens[position]?.value === value;

  const consume = () => tokens[position++];

  const expect = (value) => {
    if (!peek(value)) {
      throw new Error(`Expected ${value}`);
    }

    consume();
  };

  const toRadians = (value) =>
    angleMode === "DEG" ? (value * Math.PI) / 180 : value;

  const fromRadians = (value) =>
    angleMode === "DEG" ? (value * 180) / Math.PI : value;

  function factorial(number) {
    if (number < 0 || !Number.isInteger(number)) {
      throw new Error("Factorial requires a non-negative integer");
    }

    if (number > 170) {
      throw new Error("Result too large");
    }

    let result = 1;

    for (let i = 2; i <= number; i++) {
      result *= i;
    }

    return result;
  }

  function applyFunction(name, args) {
    const x = args[0];

    switch (name) {
      case "sin":
        return Math.sin(toRadians(x));
      case "cos":
        return Math.cos(toRadians(x));
      case "tan":
        return Math.tan(toRadians(x));

      case "asin":
        return fromRadians(Math.asin(x));
      case "acos":
        return fromRadians(Math.acos(x));
      case "atan":
        return fromRadians(Math.atan(x));

      case "sinh":
        return Math.sinh(x);
      case "cosh":
        return Math.cosh(x);
      case "tanh":
        return Math.tanh(x);

      case "asinh":
        return Math.asinh(x);
      case "acosh":
        return Math.acosh(x);
      case "atanh":
        return Math.atanh(x);

      case "sqrt":
        return Math.sqrt(x);
      case "cbrt":
        return Math.cbrt(x);
      case "abs":
        return Math.abs(x);

      case "ln":
        return Math.log(x);
      case "log":
        return Math.log10(x);
      case "log2":
        return Math.log2(x);
      case "exp":
        return Math.exp(x);

      case "logbase": {
        if (args.length !== 2) throw new Error("Enter base and value");

        const [base, value] = args;

        if (base <= 0 || base === 1 || value <= 0) {
          throw new Error("Invalid logarithm");
        }

        return Math.log(value) / Math.log(base);
      }

      case "root": {
        if (args.length !== 2) throw new Error("Enter root and value");

        const [index, value] = args;

        if (index === 0) throw new Error("Root index cannot be zero");

        if (value < 0 && Number.isInteger(index) && Math.abs(index % 2) === 1) {
          return -Math.pow(-value, 1 / index);
        }

        return Math.pow(value, 1 / index);
      }

      default:
        throw new Error("Unknown function");
    }
  }

  function parseExpression() {
    let value = parseTerm();

    while (peek("+") || peek("-")) {
      const operator = consume().value;
      const right = parseTerm();

      value =
        operator === "+"
          ? value + right
          : value - right;
    }

    return value;
  }

  function parseTerm() {
    let value = parseUnary();

    while (position < tokens.length) {
      if (peek("*") || peek("/") || peek("mod")) {
        const operator = consume().value;
        const right = parseUnary();

        if (operator === "*") {
          value *= right;
        } else if (operator === "/") {
          if (right === 0) throw new Error("Cannot divide by zero");
          value /= right;
        } else {
          if (right === 0) throw new Error("Cannot use mod with zero");
          value %= right;
        }
      } else {
        const next = tokens[position];

        const implicitMultiplication =
          next &&
          (next.type === "number" ||
            next.type === "name" ||
            next.value === "(");

        if (!implicitMultiplication) break;

        value *= parseUnary();
      }
    }

    return value;
  }

  function parseUnary() {
    if (peek("+")) {
      consume();
      return parseUnary();
    }

    if (peek("-")) {
      consume();
      return -parseUnary();
    }

    return parsePower();
  }

  function parsePower() {
    const base = parsePostfix();

    if (peek("^")) {
      consume();
      return Math.pow(base, parseUnary());
    }

    return base;
  }

  function parsePostfix() {
    let value = parsePrimary();

    while (peek("!") || peek("%")) {
      const operator = consume().value;

      if (operator === "!") {
        value = factorial(value);
      } else {
        value = value / 100;
      }
    }

    return value;
  }

  function parsePrimary() {
    const token = tokens[position];

    if (!token) throw new Error("Incomplete expression");

    if (token.type === "number") {
      consume();
      return token.value;
    }

    if (peek("(")) {
      consume();

      const value = parseExpression();

      expect(")");

      return value;
    }

    if (token.type === "name") {
      const name = consume().value;

      if (name === "pi" || name === "π") return Math.PI;
      if (name === "e") return Math.E;

      if (!peek("(")) {
        throw new Error(`Unknown constant: ${name}`);
      }

      expect("(");

      const args = [];

      if (!peek(")")) {
        args.push(parseExpression());

        while (peek(",")) {
          consume();
          args.push(parseExpression());
        }
      }

      expect(")");

      return applyFunction(name, args);
    }

    throw new Error("Invalid expression");
  }

  if (!tokens.length) return 0;

  const result = parseExpression();

  if (position !== tokens.length) {
    throw new Error("Invalid expression");
  }

  if (!Number.isFinite(result)) {
    throw new Error("Math error");
  }

  return result;
}

function formatNumber(number) {
  if (!Number.isFinite(number)) {
    throw new Error("Result is not finite");
  }

  if (Math.abs(number) < 1e-12) return "0";

  return String(Number(number.toPrecision(12)));
}

export default function ScientificCalculator() {
  const [input, setInput] = useState("");
  const [angleMode, setAngleMode] = useState("DEG");
  const [memory, setMemory] = useState(0);
  const [lastAnswer, setLastAnswer] = useState(0);
  const [error, setError] = useState("");

  const currentValue = () => {
    if (!input.trim()) return lastAnswer;

    return evaluateScientificExpression(input, angleMode);
  };

  const append = (value) => {
    setError("");

    setInput((previous) => {
      const base = previous === "Error" ? "" : previous;

      if (value === "." && (!base || /[+\-*/^(,]$/.test(base))) {
        return base + "0.";
      }

      if (!base && value === ".") return "0.";

      if (base === "0" && /^[0-9]$/.test(value)) {
        return value;
      }

      return base + value;
    });
  };

  const wrapExpression = (prefix, suffix = ")") => {
    const expression = input.trim() && input !== "Error" ? input : "0";

    setInput(`${prefix}(${expression}${suffix}`);
    setError("");
  };

  const calculate = () => {
    try {
      const result = currentValue();

      const formatted = formatNumber(result);

      setInput(formatted);
      setLastAnswer(result);
      setError("");
    } catch (err) {
      setInput("Error");
      setError(err.message || "Calculation error");
    }
  };

  const clearAll = () => {
    setInput("");
    setMemory(0);
    setLastAnswer(0);
    setError("");
  };

  const clearEntry = () => {
    setInput("");
    setError("");
  };

  const backspace = () => {
    setInput((previous) =>
      previous === "Error" ? "" : previous.slice(0, -1)
    );
    setError("");
  };

  const toggleSign = () => {
    const expression = input.trim() || "0";

    if (expression.startsWith("-(") && expression.endsWith(")")) {
      setInput(expression.slice(2, -1));
    } else {
      setInput(`-(${expression})`);
    }

    setError("");
  };

  const memoryAction = (action) => {
    try {
      const value = currentValue();

      if (action === "MC") {
        setMemory(0);
      } else if (action === "MR") {
        append(formatNumber(memory));
      } else if (action === "MS") {
        setMemory(value);
      } else if (action === "M+") {
        setMemory((previous) => previous + value);
      } else if (action === "M-") {
        setMemory((previous) => previous - value);
      }

      setError("");
    } catch (err) {
      setError(err.message || "Memory error");
    }
  };

  const handleButton = (button) => {
    switch (button.type) {
      case "insert":
        append(button.value);
        break;

      case "function":
        append(`${button.value}(`);
        break;

      case "operator":
        append(button.value);
        break;

      case "postfix":
        append(button.value);
        break;

      case "wrap": {
        const expression = input.trim() && input !== "Error" ? input : "0";
        setError("");

        const wrappers = {
          square: `(${expression})^2`,
          cube: `(${expression})^3`,
          sqrt: `sqrt(${expression})`,
          cbrt: `cbrt(${expression})`,
          exp: `e^(${expression})`,
          tenPower: `10^(${expression})`,
          reciprocal: `1/(${expression})`,
          absolute: `abs(${expression})`,
        };

        setInput(wrappers[button.value]);
        break;
      }

      case "sign":
        toggleSign();
        break;

      case "equals":
        calculate();
        break;

      case "clear":
        clearAll();
        break;

      case "clearEntry":
        clearEntry();
        break;

      case "backspace":
        backspace();
        break;

      case "memory":
        memoryAction(button.value);
        break;

      case "random":
        append(formatNumber(Math.random()));
        break;

      case "ans":
        append(formatNumber(lastAnswer));
        break;

      default:
        break;
    }
  };

  const memoryButtons = [
    { label: "MC", type: "memory", value: "MC" },
    { label: "MR", type: "memory", value: "MR" },
    { label: "MS", type: "memory", value: "MS" },
    { label: "M+", type: "memory", value: "M+" },
    { label: "M−", type: "memory", value: "M-" },
    { label: "Ans", type: "ans" },
  ];

  const scientificButtons = [
    { label: "sin", type: "function", value: "sin" },
    { label: "cos", type: "function", value: "cos" },
    { label: "tan", type: "function", value: "tan" },
    { label: "sin⁻¹", type: "function", value: "asin" },
    { label: "cos⁻¹", type: "function", value: "acos" },
    { label: "tan⁻¹", type: "function", value: "atan" },

    { label: "sinh", type: "function", value: "sinh" },
    { label: "cosh", type: "function", value: "cosh" },
    { label: "tanh", type: "function", value: "tanh" },
    { label: "sinh⁻¹", type: "function", value: "asinh" },
    { label: "cosh⁻¹", type: "function", value: "acosh" },
    { label: "tanh⁻¹", type: "function", value: "atanh" },

    { label: "π", type: "insert", value: "π" },
    { label: "e", type: "insert", value: "e" },
    { label: "xʸ", type: "operator", value: "^" },
    { label: "x³", type: "wrap", value: "cube" },
    { label: "x²", type: "wrap", value: "square" },
    { label: "eˣ", type: "wrap", value: "exp" },
    { label: "10ˣ", type: "wrap", value: "tenPower" },

    { label: "ʸ√x", type: "function", value: "root" },
    { label: "∛x", type: "wrap", value: "cbrt" },
    { label: "√x", type: "wrap", value: "sqrt" },
    { label: "ln", type: "function", value: "ln" },
    { label: "log", type: "function", value: "log" },
    { label: "log₂", type: "function", value: "log2" },
    { label: "logᵧx", type: "function", value: "logbase" },

    { label: "(", type: "insert", value: "(" },
    { label: ")", type: "insert", value: ")" },
    { label: "1/x", type: "wrap", value: "reciprocal" },
    { label: "%", type: "postfix", value: "%" },
    { label: "n!", type: "postfix", value: "!" },
    { label: "mod", type: "operator", value: "mod" },
    { label: "|x|", type: "wrap", value: "absolute" },

    { label: "EXP", type: "insert", value: "*10^(" },
    { label: "RND", type: "random" },
  ];

  const basicButtons = [
    { label: "AC", type: "clear", color: "red" },
    { label: "C", type: "clearEntry", color: "blue" },
    { label: "←", type: "backspace", color: "blue" },
    { label: "÷", type: "operator", value: "/", color: "purple" },

    { label: "7", type: "insert", value: "7" },
    { label: "8", type: "insert", value: "8" },
    { label: "9", type: "insert", value: "9" },
    { label: "×", type: "operator", value: "*", color: "purple" },

    { label: "4", type: "insert", value: "4" },
    { label: "5", type: "insert", value: "5" },
    { label: "6", type: "insert", value: "6" },
    { label: "−", type: "operator", value: "-", color: "purple" },

    { label: "1", type: "insert", value: "1" },
    { label: "2", type: "insert", value: "2" },
    { label: "3", type: "insert", value: "3" },
    { label: "+", type: "operator", value: "+", color: "purple" },

    { label: "±", type: "sign", color: "blue" },
    { label: "0", type: "insert", value: "0" },
    { label: ".", type: "insert", value: "." },
    { label: "=", type: "equals", color: "equal" },
  ];

  const buttonStyle = (button) => {
    const base =
      "min-h-11 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 hover:brightness-125";

    if (button.color === "equal") {
      return `${base} border-transparent bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl`;
    }

    if (button.color === "purple") {
      return `${base} border-purple-400/20 bg-purple-600/25 text-purple-200`;
    }

    if (button.color === "red") {
      return `${base} border-red-400/20 bg-red-500/20 text-red-300`;
    }

    if (button.color === "blue") {
      return `${base} border-blue-400/20 bg-blue-500/20 text-blue-300`;
    }

    return `${base} border-white/10 bg-white/10 text-white`;
  };

  const renderButton = (button, index) => (
    <button
      key={`${button.label}-${index}`}
      type="button"
      onClick={() => handleButton(button)}
      className={buttonStyle(button)}
      aria-label={button.label}
    >
      {button.label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080817] via-[#111126] to-[#241044] px-3 py-6 text-white sm:px-6 sm:py-10">

      <div className="mx-auto max-w-5xl">

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-purple-300 transition hover:text-white"
          >
            ← Back to Home
          </Link>

          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400">
            FREE SCIENTIFIC CALCULATOR
          </span>
        </div>

        <header className="mb-7 text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-purple-400">
            CALCMASTER PRO
          </p>

          <h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">
            Scientific{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Calculator
            </span>
          </h1>

          <p className="mt-3 text-sm text-slate-400">
            Advanced mathematics, trigonometry and scientific functions.
          </p>
        </header>

        <main className="rounded-3xl border border-purple-400/20 bg-[#111126]/90 p-3 shadow-[0_0_50px_rgba(124,58,237,0.15)] sm:p-6">

          {/* Display */}
          <div className="mb-4 rounded-2xl border border-white/10 bg-black/50 p-4 sm:p-6">

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Angle Mode</span>

                <button
                  type="button"
                  onClick={() =>
                    setAngleMode((previous) =>
                      previous === "DEG" ? "RAD" : "DEG"
                    )
                  }
                  className="rounded-lg border border-purple-400/30 bg-purple-500/20 px-4 py-2 text-xs font-bold text-purple-300 hover:bg-purple-500/30"
                >
                  {angleMode}
                </button>
              </div>

              <div className="text-xs text-slate-400">
                Memory: {formatNumber(memory)}
              </div>
            </div>

            <div className="min-h-20 overflow-x-auto text-right">

              <p className="break-all font-mono text-2xl font-semibold text-white sm:text-4xl">
                {input || "0"}
              </p>

              {error && (
                <p className="mt-2 text-sm text-red-400">
                  {error}
                </p>
              )}

              <p className="mt-3 text-xs text-slate-500">
                Previous Answer: {formatNumber(lastAnswer)}
              </p>
            </div>
          </div>

          {/* Memory Buttons */}
          <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {memoryButtons.map(renderButton)}
          </div>

          {/* Scientific Buttons */}
          <div className="mb-4">
            <h2 className="mb-3 text-xs font-bold tracking-widest text-purple-300">
              SCIENTIFIC FUNCTIONS
            </h2>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-7">
              {scientificButtons.map(renderButton)}
            </div>
          </div>

          {/* Number Pad */}
          <div>
            <h2 className="mb-3 text-xs font-bold tracking-widest text-blue-300">
              NUMBER PAD
            </h2>

            <div className="grid grid-cols-4 gap-2">
              {basicButtons.map(renderButton)}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-white/5 bg-white/5 p-3 text-center text-xs text-slate-400">
            DEG/RAD controls trigonometric angle calculations.
            <br />
            For y-th root, enter: root(index, value).
            <br />
            For logarithm with a custom base, enter: logbase(base, value).
          </div>

        </main>

        <p className="mt-5 text-center text-xs text-slate-500">
          CalcMaster Pro · Scientific Calculator · Free
        </p>

      </div>
    </div>
  );
}