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
