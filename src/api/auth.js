import axios from "axios";
//axios.defaults.headers.common['X-CSRF-TOKEN'] ='jjgV9gJ83HoQk231IZa16xhaCfdZBn5Qunsv4YpN'
export default axios.create({
  //baseURL: "https://api-stylux.herokuapp.com/",
  baseURL: 
  process.env.NODE_ENV === "production"
    ? "https://bd-stylux.herokuapp.com/"
    : "http://localhost:8000/",

  withCredentials: true,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});
