export function saveCalculation(type, expression, result) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const history = JSON.parse(
    localStorage.getItem("calcHistory") || "[]"
  );

  const newRecord = {
    id: crypto.randomUUID(),
    userId: user._id || user.id || user.userId || null,
    type,
    expression: String(expression),
    result: String(result),
    createdAt: new Date().toISOString(),
  };

  history.unshift(newRecord);

  localStorage.setItem(
    "calcHistory",
    JSON.stringify(history)
  );

  return newRecord;
}