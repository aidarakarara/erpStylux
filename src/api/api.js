import axios from "axios";
export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://bd-stylux.herokuapp.com/"
      : "http://localhost:8000/",
  //baseURL: "https://api-stylux.herokuapp.com/",
  withCredentials: true,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});
