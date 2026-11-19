
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const coins = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿" },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ" },
  { symbol: "USDT", name: "Tether", icon: "₮" },
  { symbol: "BNB", name: "BNB", icon: "◆" },
  { symbol: "SOL", name: "Solana", icon: "◎" },
  { symbol: "XRP", name: "XRP", icon: "✕" },
  { symbol: "DOGE", name: "Dogecoin", icon: "Ð" },
];

// Fixed demo prices in INR (not live market prices)
const samplePrices = {
  BTC: 7000000,
  ETH: 200000,
  USDT: 95,
  BNB: 55000,
  SOL: 14000,
  XRP: 200,
  DOGE: 20,
};

const initialValues = {
  coin: "BTC",
  amount: "1",
  buyPrice: "5000000",
  sellPrice: "5500000",
  currentPrice: "5500000",
  fee: "0.1",
  investment: "10000",
};

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);

const number = (value) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 8,
  }).format(Number.isFinite(value) ? value : 0);

function InputField({
  label,
  value,
  onChange,
  placeholder,
  suffix,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <div className="flex items-center rounded-xl border border-white/10 bg-[#0b1020] focus-within:border-purple-500">
        <input
          type="number"
          min="0"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-w-0 bg-transparent px-4 py-3 text-white outline-none"
        />

        {suffix && (
          <span className="px-4 text-sm text-slate-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ResultCard({ title, value, description, color = "purple" }) {
  const colors = {
    purple: "from-purple-600/20 to-purple-900/10 text-purple-300",
    blue: "from-blue-600/20 to-blue-900/10 text-blue-300",
    green: "from-emerald-600/20 to-emerald-900/10 text-emerald-300",
    red: "from-red-600/20 to-red-900/10 text-red-300",
  };

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-gradient-to-br ${colors[color]} p-5`}
    >
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-3 break-words text-2xl font-bold">
        {value}
      </h3>
      <p className="mt-2 text-xs text-slate-500">{description}</p>
    </div>
  );
}

export default function CryptoCalculator() {
  const [values, setValues] = useState(initialValues);
  const [activeTab, setActiveTab] = useState("converter");

  const update = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const amount = Math.max(0, Number(values.amount) || 0);
  const buyPrice = Math.max(0, Number(values.buyPrice) || 0);
  const sellPrice = Math.max(0, Number(values.sellPrice) || 0);
  const currentPrice = Math.max(0, Number(values.currentPrice) || 0);
  const feeRate = Math.min(100, Math.max(0, Number(values.fee) || 0));
  const investment = Math.max(0, Number(values.investment) || 0);

  const results = useMemo(() => {
    const buyValue = amount * buyPrice;
    const buyFee = (buyValue * feeRate) / 100;
    const totalCost = buyValue + buyFee;

    const sellValue = amount * sellPrice;
    const sellFee = (sellValue * feeRate) / 100;
    const netSellValue = sellValue - sellFee;

    const profitLoss = netSellValue - totalCost;
    const profitPercent =
      totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;

    const currentValue = amount * currentPrice;
    const currentFee = (currentValue * feeRate) / 100;

    const cryptoQuantity =
      currentPrice > 0 ? investment / currentPrice : 0;

    return {
      buyValue,
      buyFee,
      totalCost,
      sellValue,
      sellFee,
      netSellValue,
      profitLoss,
      profitPercent,
      currentValue,
      currentFee,
      cryptoQuantity,
    };
  }, [
    amount,
    buyPrice,
    sellPrice,
    currentPrice,
    feeRate,
    investment,
  ]);

  const resetCalculator = () => {
    setValues(initialValues);
    setActiveTab("converter");
  };

  const selectedCoin =
    coins.find((coin) => coin.symbol === values.coin) || coins[0];

  const tabs = [
    { id: "converter", label: "Converter", icon: "⇄" },
    { id: "profit", label: "Profit / Loss", icon: "📊" },
    { id: "fees", label: "Trading Fees", icon: "💳" },
    { id: "portfolio", label: "Portfolio", icon: "💼" },
  ];

  return (
    <div className="min-h-screen bg-[#070816] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-purple-700/10 blur-[120px]" />
        <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-purple-300"
            >
              ← Back to Home
            </Link>

            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-3xl shadow-lg shadow-purple-900/30">
                ₿
              </div>

              <div>
                <h1 className="text-3xl font-black md:text-4xl">
                  Crypto <span className="text-purple-400">Calculator</span>
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  Calculate crypto value, fees and estimated returns.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={resetCalculator}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-purple-500 hover:text-white"
          >
            ↻ Reset All
          </button>
        </div>

        {/* Market notice */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
          <div>
            <p className="font-semibold text-blue-300">
              Educational Calculator
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Enter your own prices. Live market prices are not connected.
            </p>
          </div>

          <span className="rounded-full border border-blue-500/20 px-3 py-1 text-xs text-blue-300">
            Manual Price Mode
          </span>
        </div>

        {/* Coin Selection */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <label className="mb-3 block text-sm font-semibold text-slate-300">
            Select Cryptocurrency
          </label>

          <div className="flex flex-wrap gap-2">
            {coins.map((coin) => (
              <button
                key={coin.symbol}
                onClick={() => {
                  setValues((prev) => ({
                    ...prev,
                    coin: coin.symbol,
                    currentPrice: String(samplePrices[coin.symbol]),
                  }));
                }}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  values.coin === coin.symbol
                    ? "border-purple-500 bg-purple-600/20 text-purple-300"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-purple-500/50"
                }`}
              >
                <span className="mr-2">{coin.icon}</span>
                {coin.symbol}
              </button>
            ))}
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Selected: {selectedCoin.name} ({selectedCoin.symbol})
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2 md:grid-cols-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Converter */}
        {activeTab === "converter" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <h2 className="mb-2 text-xl font-bold">
                Crypto Converter
              </h2>
              <p className="mb-7 text-sm text-slate-400">
                Calculate how much crypto you can get with your INR.
              </p>

              <div className="space-y-5">
                <InputField
                  label="Investment Amount"
                  value={values.investment}
                  onChange={(v) => update("investment", v)}
                  suffix="INR"
                />

                <InputField
                  label="Price of 1 Coin"
                  value={values.currentPrice}
                  onChange={(v) => update("currentPrice", v)}
                  suffix="INR"
                />
              </div>

              <div className="mt-7 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5">
                <p className="text-sm text-slate-400">
                  Estimated Crypto Quantity
                </p>
                <h3 className="mt-2 break-all text-3xl font-black text-purple-300">
                  {number(results.cryptoQuantity)} {values.coin}
                </h3>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                title="Investment"
                value={money(investment)}
                description="Your entered INR amount"
                color="blue"
              />
              <ResultCard
                title="Coin Price"
                value={money(currentPrice)}
                description={`Price of 1 ${values.coin}`}
              />
              <ResultCard
                title="Crypto Quantity"
                value={number(results.cryptoQuantity)}
                description={`Estimated ${values.coin} quantity`}
                color="green"
              />
              <ResultCard
                title="Estimated Value"
                value={money(results.cryptoQuantity * currentPrice)}
                description="Before any additional charges"
                color="purple"
              />
            </div>
          </div>
        )}

        {/* Profit / Loss */}
        {activeTab === "profit" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <h2 className="mb-2 text-xl font-bold">
                Profit / Loss Calculator
              </h2>
              <p className="mb-7 text-sm text-slate-400">
                Compare your entered buy and sell prices.
              </p>

              <div className="space-y-5">
                <InputField
                  label="Crypto Quantity"
                  value={values.amount}
                  onChange={(v) => update("amount", v)}
                  suffix={values.coin}
                />

                <InputField
                  label="Buy Price (per coin)"
                  value={values.buyPrice}
                  onChange={(v) => update("buyPrice", v)}
                  suffix="INR"
                />

                <InputField
                  label="Sell Price (per coin)"
                  value={values.sellPrice}
                  onChange={(v) => update("sellPrice", v)}
                  suffix="INR"
                />

                <InputField
                  label="Trading Fee"
                  value={values.fee}
                  onChange={(v) => update("fee", v)}
                  suffix="%"
                />
              </div>
            </div>

            <div className="space-y-4">
              <ResultCard
                title="Total Buy Cost (Including Fee)"
                value={money(results.totalCost)}
                description={`Buy value: ${money(results.buyValue)} + Fee: ${money(results.buyFee)}`}
                color="blue"
              />

              <ResultCard
                title="Net Selling Amount"
                value={money(results.netSellValue)}
                description={`Sell value: ${money(results.sellValue)} - Fee: ${money(results.sellFee)}`}
                color="purple"
              />

              <ResultCard
                title={results.profitLoss >= 0 ? "Estimated Profit" : "Estimated Loss"}
                value={`${results.profitLoss < 0 ? "-" : "+"}${money(Math.abs(results.profitLoss))}`}
                description={`${results.profitPercent.toFixed(2)}%`}
                color={results.profitLoss >= 0 ? "green" : "red"}
              />
            </div>
          </div>
        )}

        {/* Fees */}
        {activeTab === "fees" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <h2 className="mb-2 text-xl font-bold">
                Trading Fee Calculator
              </h2>
              <p className="mb-7 text-sm text-slate-400">
                Estimate transaction charges using your entered fee rate.
              </p>

              <div className="space-y-5">
                <InputField
                  label="Transaction Amount"
                  value={values.amount}
                  onChange={(v) => update("amount", v)}
                  suffix={values.coin}
                />

                <InputField
                  label="Price per Coin"
                  value={values.currentPrice}
                  onChange={(v) => update("currentPrice", v)}
                  suffix="INR"
                />

                <InputField
                  label="Trading Fee"
                  value={values.fee}
                  onChange={(v) => update("fee", v)}
                  suffix="%"
                />
              </div>
            </div>

            <div className="space-y-4">
              <ResultCard
                title="Transaction Value"
                value={money(results.currentValue)}
                description="Quantity × coin price"
                color="blue"
              />

              <ResultCard
                title="Estimated Trading Fee"
                value={money(results.currentFee)}
                description={`${feeRate.toFixed(2)}% of transaction value`}
                color="purple"
              />

              <ResultCard
                title="Amount After Fee"
                value={money(results.currentValue - results.currentFee)}
                description="Estimated amount after deducting fee"
                color="green"
              />
            </div>
          </div>
        )}

        {/* Portfolio */}
        {activeTab === "portfolio" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <h2 className="mb-2 text-xl font-bold">
                Portfolio Calculator
              </h2>
              <p className="mb-7 text-sm text-slate-400">
                Estimate the current value of a crypto holding.
              </p>

              <div className="space-y-5">
                <InputField
                  label="Crypto Quantity Held"
                  value={values.amount}
                  onChange={(v) => update("amount", v)}
                  suffix={values.coin}
                />

                <InputField
                  label="Current Price per Coin"
                  value={values.currentPrice}
                  onChange={(v) => update("currentPrice", v)}
                  suffix="INR"
                />

                <InputField
                  label="Original Buy Price per Coin"
                  value={values.buyPrice}
                  onChange={(v) => update("buyPrice", v)}
                  suffix="INR"
                />
              </div>
            </div>

            <div className="space-y-4">
              <ResultCard
                title="Current Portfolio Value"
                value={money(results.currentValue)}
                description={`${number(amount)} ${values.coin} × ${money(currentPrice)}`}
                color="blue"
              />

              <ResultCard
                title="Original Purchase Value"
                value={money(results.buyValue)}
                description="Quantity × original buy price"
                color="purple"
              />

              <ResultCard
                title="Estimated Change"
                value={`${results.currentValue - results.buyValue < 0 ? "-" : "+"}${money(Math.abs(results.currentValue - results.buyValue))}`}
                description={
                  results.currentValue >= results.buyValue
                    ? "Value is above the original purchase value"
                    : "Value is below the original purchase value"
                }
                color={
                  results.currentValue >= results.buyValue
                    ? "green"
                    : "red"
                }
              />
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <h3 className="font-semibold text-slate-300">
            Important Information
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            This calculator provides mathematical estimates based on the
            values entered by the user. Cryptocurrency prices can change
            rapidly. Actual exchange fees, taxes, spreads and other charges
            may differ. Results are not guaranteed and this tool is not
            investment or trading advice.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} CalcMaster Pro · Crypto Calculator
        </div>
      </div>
    </div>
  );
}
