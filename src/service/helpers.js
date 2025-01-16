import { format } from "date-fns";

export const getIdFromLocation = (location) => {
  if (!location || !location.pathname) {
    console.error("Invalid location object:", location);
    return null;
  }

  const match = location.pathname.match(/\/movies\/(\d+)/);
  return match ? match[1] : null;
};


  export const getYearFromDate = (date) => {
    try {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate)) {
        throw new Error("Parsed date is invalid");
      }
      return format(parsedDate, "yyyy");
    } catch (error) {
      console.error("Error in getYearFromDate:", error.message);
      return "Invalid date";
    }
  };

  export const formatDate = (date) => {
    return format(date, "Pp")
  }