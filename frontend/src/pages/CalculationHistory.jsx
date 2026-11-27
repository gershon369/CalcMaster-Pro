
import { useEffect, useMemo, useState } from "react";
import {
  FaCalculator,
  FaSearch,
  FaTrash,
  FaBookmark,
  FaRegBookmark,
  FaFilePdf,
  FaFileCsv,
  FaFilter,
  FaClock,
  FaCopy,
  FaTimes,
  FaHistory,
  FaChartBar,
} from "react-icons/fa";

const HISTORY_KEY = "calcHistory";
const FAVORITES_KEY = "calcFavorites";

export default function CalculationHistory() {
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [customDate, setCustomDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const savedHistory = JSON.parse(
        localStorage.getItem(HISTORY_KEY) || "[]"
      );

      const savedFavorites = JSON.parse(
        localStorage.getItem(FAVORITES_KEY) || "[]"
      );

      setHistory(Array.isArray(savedHistory) ? savedHistory : []);
      setFavorites(Array.isArray(savedFavorites) ? savedFavorites : []);
    } catch {
      setHistory([]);
      setFavorites([]);
    }
  }, []);

  const notify = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2500);
  };

  const saveHistory = (data) => {
    setHistory(data);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
  };

  const saveFavorites = (data) => {
    setFavorites(data);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(data));
  };

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch = [
        item.expression,
        item.result,
        item.type,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      );

      const matchesType =
        type === "All" || item.type === type;

      const itemDate = new Date(item.createdAt);
      const now = new Date();

      let matchesDate = true;

      if (dateFilter === "Today") {
        matchesDate =
          itemDate.toDateString() === now.toDateString();
      } else if (dateFilter === "Yesterday") {
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        matchesDate =
          itemDate.toDateString() === yesterday.toDateString();
      } else if (dateFilter === "Last 7 Days") {
        const start = new Date();
        start.setDate(now.getDate() - 7);
        matchesDate = itemDate >= start && itemDate <= now;
      } else if (dateFilter === "Last 30 Days") {
        const start = new Date();
        start.setDate(now.getDate() - 30);
        matchesDate = itemDate >= start && itemDate <= now;
      } else if (dateFilter === "Custom Date" && customDate) {
        matchesDate =
          itemDate.toDateString() ===
          new Date(`${customDate}T00:00:00`).toDateString();
      }

      return matchesSearch && matchesType && matchesDate;
    });
  }, [history, search, type, dateFilter, customDate]);

  const totalCalculations = history.length;

  const savedCount = history.filter((item) =>
    favorites.includes(item.id)
  ).length;

  const todayCount = history.filter(
    (item) =>
      new Date(item.createdAt).toDateString() ===
      new Date().toDateString()
  ).length;

  const deleteHistory = (id) => {
    saveHistory(history.filter((item) => item.id !== id));
    saveFavorites(favorites.filter((fav) => fav !== id));
    notify("Calculation deleted successfully");
  };

  const clearHistory = () => {
    saveHistory([]);
    saveFavorites([]);
    setShowClearModal(false);
    notify("All calculation history cleared");
  };

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];

    saveFavorites(updated);

    notify(
      favorites.includes(id)
        ? "Removed from favorites"
        : "Added to favorites"
    );
  };

  const copyResult = async (item) => {
    try {
      await navigator.clipboard.writeText(
        `${item.expression} = ${item.result}`
      );
      notify("Calculation copied");
    } catch {
      notify("Unable to copy calculation");
    }
  };

  const escapeHTML = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);

  const formatDate = (date) => {
    const value = new Date(date);

    if (Number.isNaN(value.getTime())) return "Unknown date";

    return value.toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  
const exportCSV = () => {
  if (!filteredHistory.length) {
    notify("No calculations to export");
    return;
  }

  const escapeCSV = (value) => {
    const text = String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
  };

  const rows = [
    [
      "No.",
      "Calculator Type",
      "Expression",
      "Result",
      "Date",
      "Time",
      "Favorite",
    ],

    ...filteredHistory.map((item, index) => {
      const date = new Date(item.createdAt);

      return [
        index + 1,
        item.type || "Calculator",
        item.expression || "",
        item.result || "",
        Number.isNaN(date.getTime())
          ? "Unknown"
          : date.toLocaleDateString("en-IN"),
        Number.isNaN(date.getTime())
          ? "Unknown"
          : date.toLocaleTimeString("en-IN"),
        favorites.includes(item.id) ? "Yes" : "No",
      ];
    }),
  ];

  const csvContent = rows
    .map((row) => row.map(escapeCSV).join(","))
    .join("\r\n");

  // UTF-8 BOM for Excel compatibility
  const blob = new Blob(
    ["\uFEFF" + csvContent],
    { type: "text/csv;charset=utf-8;" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  const today = new Date().toLocaleDateString("en-CA");

  link.href = url;
  link.download = `calcmaster-history-${today}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 1000);

  notify("CSV exported successfully");
};


  // PROFESSIONAL PDF REPORT - OPENS IN NEW TAB
  const exportPDF = () => {
    if (!filteredHistory.length) {
      notify("No calculations to export");
      return;
    }

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      notify("Please allow pop-ups to export PDF");
      return;
    }

    const now = new Date();

    const reportDate = now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const reportTime = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const rows = filteredHistory.map((item, index) => {
      const isFavorite = favorites.includes(item.id);

      return `
        <tr>
          <td class="number">${String(index + 1).padStart(2, "0")}</td>
          <td>
            <div class="calculator-name">
              ${escapeHTML(item.type || "Calculator")}
            </div>
            ${isFavorite ? '<span class="favorite">★ Favorite</span>' : ""}
          </td>
          <td class="expression">
            ${escapeHTML(item.expression)}
          </td>
          <td class="result">
            ${escapeHTML(item.result)}
          </td>
          <td class="date">
            ${escapeHTML(formatDate(item.createdAt))}
          </td>
        </tr>
      `;
    }).join("");

    const reportHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>CalcMaster Pro - Calculation History</title>

        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 35px;
            background: #e9e5f1;
            color: #241936;
            font-family: Arial, Helvetica, sans-serif;
          }

          .toolbar {
            max-width: 1100px;
            margin: 0 auto 20px;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
          }

          .toolbar button {
            border: none;
            border-radius: 10px;
            padding: 12px 20px;
            cursor: pointer;
            font-weight: 700;
            font-size: 13px;
          }

          .print-button {
            color: white;
            background: #7138cf;
          }

          .close-button {
            color: #38244f;
            background: white;
          }

          .report {
            max-width: 1100px;
            margin: auto;
            background: white;
            box-shadow: 0 15px 50px rgba(30, 15, 55, 0.12);
            border-radius: 16px;
            overflow: hidden;
          }

          .header {
            padding: 38px 42px;
            background: linear-gradient(125deg, #170b2d, #35136b, #6030a5);
            color: white;
            position: relative;
          }

          .brand-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
          }

          .brand {
            font-size: 27px;
            font-weight: 800;
            letter-spacing: -1px;
          }

          .brand span {
            color: #c5a5ff;
          }

          .report-label {
            padding: 8px 13px;
            border: 1px solid rgba(255,255,255,.3);
            border-radius: 30px;
            font-size: 10px;
            letter-spacing: 1.5px;
            font-weight: bold;
          }

          .header h1 {
            font-size: 30px;
            margin: 35px 0 8px;
          }

          .header p {
            color: #d6c7ed;
            font-size: 13px;
            margin: 0;
          }

          .header-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 25px;
            margin-top: 25px;
            color: #e5d9f6;
            font-size: 12px;
          }

          .content {
            padding: 35px 42px;
          }

          .section-title {
            font-size: 17px;
            font-weight: 800;
            margin: 0 0 18px;
            color: #26143e;
          }

          .stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 35px;
          }

          .stat-card {
            border: 1px solid #e9e0f6;
            background: #faf8ff;
            padding: 19px;
            border-radius: 12px;
          }

          .stat-label {
            font-size: 11px;
            color: #796b8b;
            font-weight: 600;
          }

          .stat-value {
            color: #6630b5;
            font-size: 27px;
            font-weight: 800;
            margin-top: 9px;
          }

          .table-wrap {
            width: 100%;
            overflow: visible;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
          }

          thead {
            display: table-header-group;
          }

          th {
            background: #291344;
            color: white;
            text-align: left;
            padding: 13px 10px;
            font-size: 10px;
            letter-spacing: .4px;
            text-transform: uppercase;
          }

          td {
            padding: 14px 10px;
            border-bottom: 1px solid #eee8f5;
            font-size: 11px;
            vertical-align: top;
            overflow-wrap: anywhere;
            line-height: 1.5;
          }

          tbody tr:nth-child(even) {
            background: #faf8fd;
          }

          .number {
            color: #8c7c9f;
            font-weight: 700;
          }

          .calculator-name {
            color: #392050;
            font-weight: 700;
          }

          .favorite {
            display: inline-block;
            margin-top: 5px;
            color: #a16b00;
            font-size: 9px;
            font-weight: bold;
          }

          .expression {
            color: #6f617d;
          }

          .result {
            color: #6630b5;
            font-weight: 800;
          }

          .date {
            color: #857a91;
            font-size: 10px;
          }

          .footer {
            margin-top: 35px;
            padding-top: 20px;
            border-top: 1px solid #e9e1f1;
            display: flex;
            justify-content: space-between;
            gap: 15px;
            color: #93869e;
            font-size: 10px;
          }

          .footer strong {
            color: #6735ad;
          }

          @media (max-width: 650px) {
            body {
              padding: 10px;
            }

            .header,
            .content {
              padding: 25px 18px;
            }

            .brand {
              font-size: 21px;
            }

            .header h1 {
              font-size: 24px;
            }

            .report-label {
              font-size: 8px;
            }

            .stats {
              gap: 8px;
            }

            .stat-card {
              padding: 12px 8px;
            }

            .stat-value {
              font-size: 21px;
            }

            table {
              min-width: 650px;
            }

            .table-wrap {
              overflow-x: auto;
            }

            .toolbar {
              padding: 0 5px;
            }
          }

          @page {
            size: A4 landscape;
            margin: 12mm;
          }

          @media print {
            body {
              padding: 0;
              background: white;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .toolbar {
              display: none !important;
            }

            .report {
              max-width: none;
              box-shadow: none;
              border-radius: 0;
              overflow: visible;
            }

            .header {
              break-inside: avoid;
            }

            .content {
              padding: 25px 30px;
            }

            .stats {
              break-inside: avoid;
            }

            table {
              min-width: 0;
            }

            tr {
              break-inside: avoid;
            }

            th, td {
              padding: 9px 7px;
              font-size: 9px;
            }

            .footer {
              break-inside: avoid;
            }
          }
        </style>
      </head>

      <body>

        <div class="toolbar">
          <button class="close-button" onclick="window.close()">
            Close Preview
          </button>

          <button class="print-button" onclick="window.print()">
            Print / Save as PDF
          </button>
        </div>

        <div class="report">

          <header class="header">

            <div class="brand-row">
              <div class="brand">
                CalcMaster <span>Pro.</span>
              </div>

              <div class="report-label">
                OFFICIAL CALCULATION REPORT
              </div>
            </div>

            <h1>Calculation History</h1>

            <p>
              Your calculation records, organized in one professional report.
            </p>

            <div class="header-meta">
              <span>📅 ${escapeHTML(reportDate)}</span>
              <span>🕒 ${escapeHTML(reportTime)}</span>
              <span>📊 ${filteredHistory.length} Records</span>
            </div>

          </header>

          <main class="content">

            <h2 class="section-title">Report Overview</h2>

            <section class="stats">

              <div class="stat-card">
                <div class="stat-label">TOTAL CALCULATIONS</div>
                <div class="stat-value">${totalCalculations}</div>
              </div>

              <div class="stat-card">
                <div class="stat-label">TODAY'S CALCULATIONS</div>
                <div class="stat-value">${todayCount}</div>
              </div>

              <div class="stat-card">
                <div class="stat-label">SAVED CALCULATIONS</div>
                <div class="stat-value">${savedCount}</div>
              </div>

            </section>

            <h2 class="section-title">Calculation Records</h2>

            <div class="table-wrap">

              <table>
                <colgroup>
                  <col style="width: 5%">
                  <col style="width: 18%">
                  <col style="width: 30%">
                  <col style="width: 19%">
                  <col style="width: 28%">
                </colgroup>

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Calculator</th>
                    <th>Expression</th>
                    <th>Result</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>

                <tbody>
                  ${rows}
                </tbody>

              </table>

            </div>

            <footer class="footer">
              <div>
                Generated by <strong>CalcMaster Pro</strong>
              </div>

              <div>
                Calculation History Report • ${filteredHistory.length} Records
              </div>
            </footer>

          </main>

        </div>

      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(reportHTML);
    printWindow.document.close();

    notify("PDF report opened in a new tab");
  };

  return (
    <div className="min-h-full w-full bg-[#080610] text-white">
      <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="max-w-[1600px] mx-auto space-y-7">

          {/* HEADER */}
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <FaHistory size={23} />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    Calculation History
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    Manage and track all your calculations
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm"
              >
                <FaFileCsv className="text-green-400" />
                Export CSV
              </button>

              <button
                onClick={exportPDF}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-semibold"
              >
                <FaFilePdf />
                Export PDF
              </button>
            </div>
          </header>

          {/* STATISTICS */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Total Calculations",
                value: totalCalculations,
                icon: <FaCalculator />,
                color: "text-purple-400",
                bg: "bg-purple-500/10",
              },
              {
                title: "Today's Calculations",
                value: todayCount,
                icon: <FaChartBar />,
                color: "text-cyan-400",
                bg: "bg-cyan-500/10",
              },
              {
                title: "Saved Calculations",
                value: savedCount,
                icon: <FaBookmark />,
                color: "text-pink-400",
                bg: "bg-pink-500/10",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-[#15111F] border border-white/10 p-5"
              >
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-sm">{item.title}</p>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
                    {item.icon}
                  </div>
                </div>
                <h2 className="text-3xl font-bold mt-4">
                  {item.value.toLocaleString()}
                </h2>
              </div>
            ))}
          </section>

          {/* SEARCH AND FILTER */}
          <section className="rounded-2xl bg-[#15111F] border border-white/10 p-4 sm:p-5 space-y-4">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search expression, result or calculator..."
                  className="w-full bg-[#080610] border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-purple-500 text-sm"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
              >
                <FaFilter className="text-purple-400" />
                Filters
              </button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Calculator Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-[#080610] border border-white/10 rounded-xl p-3 outline-none"
                  >
                    {[
                      "All",
                      "Basic",
                      "Scientific",
                      "BMI",
                      "GST",
                      "Loan EMI",
                      "SIP",
                      "Crypto",
                      "Retirement",
                    ].map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Date Range
                  </label>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full bg-[#080610] border border-white/10 rounded-xl p-3 outline-none"
                  >
                    {[
                      "All",
                      "Today",
                      "Yesterday",
                      "Last 7 Days",
                      "Last 30 Days",
                      "Custom Date",
                    ].map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                {dateFilter === "Custom Date" && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="w-full bg-[#080610] border border-white/10 rounded-xl p-3 text-white"
                    />
                  </div>
                )}

                <button
                  onClick={() => {
                    setType("All");
                    setDateFilter("All");
                    setCustomDate("");
                    setSearch("");
                  }}
                  className="self-end text-purple-400 text-sm hover:text-purple-300"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </section>

          {/* HISTORY LIST */}
          <section className="rounded-2xl bg-[#15111F] border border-white/10 overflow-hidden">
            <div className="p-5 sm:p-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold">All Calculations</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Showing {filteredHistory.length} of {history.length} records
                </p>
              </div>

              <button
                onClick={() => setShowClearModal(true)}
                disabled={history.length === 0}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm disabled:opacity-40"
              >
                <FaTrash />
                Clear All History
              </button>
            </div>

            {filteredHistory.length === 0 ? (
              <div className="py-16 px-5 text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto">
                  <FaHistory size={28} />
                </div>

                <h3 className="text-xl font-bold mt-5">
                  {history.length === 0
                    ? "No Calculations Yet"
                    : "No Matching Results"}
                </h3>

                <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
                  {history.length === 0
                    ? "Your calculations will appear here when calculator pages start saving their results."
                    : "Try changing your search or filters."}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {filteredHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 hover:bg-white/[0.02] transition"
                  >
                    <div className="flex flex-wrap justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                          <FaCalculator size={19} />
                        </div>

                        <div>
                          <p className="font-semibold">
                            {item.type || "Calculator"}
                          </p>
                          <p className="text-gray-500 text-xs flex items-center gap-2 mt-1">
                            <FaClock />
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          title="Save calculation"
                          className="text-yellow-400 hover:scale-110 transition"
                        >
                          {favorites.includes(item.id)
                            ? <FaBookmark size={17} />
                            : <FaRegBookmark size={17} />}
                        </button>

                        <button
                          onClick={() => copyResult(item)}
                          title="Copy calculation"
                          className="text-gray-400 hover:text-white"
                        >
                          <FaCopy />
                        </button>

                        <button
                          onClick={() => deleteHistory(item.id)}
                          title="Delete calculation"
                          className="text-gray-400 hover:text-red-400"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>

                    <div className="mt-5 ml-0 sm:ml-14">
                      <p className="text-gray-400 text-sm break-all">
                        {item.expression}
                      </p>
                      <p className="text-2xl font-bold text-purple-400 mt-2 break-all">
                        = {item.result}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <p className="text-center text-gray-600 text-xs pb-4">
            CalcMaster Pro • Calculation History
          </p>
        </div>
      </main>

      {/* TOAST */}
      {message && (
        <div className="fixed bottom-6 right-6 z-[100] bg-[#241638] border border-purple-500/30 px-5 py-3 rounded-xl shadow-xl text-sm">
          {message}
        </div>
      )}

      {/* CLEAR CONFIRMATION */}
      {showClearModal && (
        <div className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#15111F] border border-white/10 p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Clear All History?</h3>
              <button onClick={() => setShowClearModal(false)}>
                <FaTimes className="text-gray-400" />
              </button>
            </div>

            <p className="text-gray-400 text-sm mt-4">
              This will permanently delete all locally stored calculation
              history and saved history bookmarks. This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-7">
              <button
                onClick={() => setShowClearModal(false)}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10"
              >
                Cancel
              </button>

              <button
                onClick={clearHistory}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 font-semibold"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
