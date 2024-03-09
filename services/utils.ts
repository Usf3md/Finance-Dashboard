export const getTodaysDate = () => {
  var today = new Date();
  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var day = String(today.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
};

export const titleCase = (str: string) => {
  if (!str) return "";
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
};

export function getCurrentDate() {
  var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();

  return date.toISOString().split("T")[0];
}

export function formatDate(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${date.toDateString()} | ${hours}:${minutes}:${seconds}`;
}

export function convertSecondsToHMS(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
}

export function convertSecondsToDuration(seconds: number) {
  if (seconds === 0) return 0 + " s";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let duration = "";
  if (hours > 0) {
    duration += hours + " h ";
  }
  if (minutes > 0) {
    duration += minutes + " m ";
  }
  if (remainingSeconds > 0) {
    duration += remainingSeconds + " s";
  }

  return duration.trim();
}
