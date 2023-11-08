export function formatTimeStamp({
  inputTimestamp,
}: {
  inputTimestamp: string | number | boolean | string[] | number[];
}) {
  if ((inputTimestamp = "")) return;
  // Create a new Date object from the input timestamp
  const date = new Date(inputTimestamp);

  // Extract the date and time components
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  // Format the components into the desired string format
  const formattedTimestamp = {
    date: `${month}/${day}/${year}`,
    time: `${hours}:${minutes}`,
    dateTime: `${month}/${day}/${year} ${hours}:${minutes}`,
  };

  return formattedTimestamp;
}

// Function to format a date as "dd/mm/yyyy"
export function formatDate(date: Date): string {
  return `${(date.getDate() + "").padStart(2, "0")}/${(
    date.getMonth() +
    1 +
    ""
  ).padStart(2, "0")}/${date.getFullYear()}`;
}

// Function to get a date with an optional number of days subtracted
export function getDateWithSubtraction(days = 0): string {
  const now = new Date();
  const resultDate = new Date(now);
  resultDate.setDate(now.getDate() - days);
  const date = formatDate(resultDate);
  return date;
}

export function getCurDate(): Date {
  return new Date();
}
export function getMonthDate(date = new Date(), month = 0, day = 0): Date {
  return new Date(date.getFullYear(), date.getMonth() + month, day);
}
