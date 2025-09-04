const BASE_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : "https://game-page-db.onrender.com";

export default BASE_URL;
