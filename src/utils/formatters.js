import { format, formatDistanceToNow, parseISO } from "date-fns";
function formatZuluTime(date = /* @__PURE__ */ new Date()) {
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds} UTC`;
}
function formatRelativeTime(dateString) {
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch {
    return dateString;
  }
}
function formatTacticalDate(dateString) {
  try {
    return format(parseISO(dateString), "dd-MMM-yyyy").toUpperCase();
  } catch {
    return dateString;
  }
}
function truncateHash(hash, front = 8, back = 4) {
  if (!hash || hash.length <= front + back) return hash;
  return `${hash.slice(0, front)}...${hash.slice(-back)}`;
}
function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount);
}
export {
  formatBytes,
  formatCurrency,
  formatRelativeTime,
  formatTacticalDate,
  formatZuluTime,
  truncateHash
};
