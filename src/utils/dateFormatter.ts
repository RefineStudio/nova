export const dateFormatter = (date: Date | string) => {
  const d = new Date(date);

  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();

  const originalString = typeof date === "string" ? date : "";

  const hasTime =
    originalString.includes("T") ||
    d.getHours() !== 0 ||
    d.getMinutes() !== 0 ||
    d.getSeconds() !== 0;

  if (!hasTime) {
    return `${month} ${day}, ${year}`;
  }

  let hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const minutesStr = minutes.toString().padStart(2, "0");

  return `${month} ${day}, ${year} at ${hours}:${minutesStr}${ampm}`;
};
