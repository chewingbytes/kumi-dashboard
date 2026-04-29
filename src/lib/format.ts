export function formatDateTime(value: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-SG", {
    timeZone: "Asia/Singapore",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function parseMinutes(value: string | number | null): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  const str = String(value).toLowerCase();
  if (str.includes("h")) {
    const match = str.match(/(\d+)h\s*(\d+)?m?/);
    if (!match) return 0;
    const h = Number(match[1] || 0);
    const m = Number(match[2] || 0);
    return h * 60 + m;
  }
  const num = Number(str.replace(/[^0-9]/g, ""));
  return Number.isNaN(num) ? 0 : num;
}
