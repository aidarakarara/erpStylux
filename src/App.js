// routes
import Router from "./routes";

// theme
import ThemeConfig from "./theme";
// components
import ScrollToTop from "./components/ScrollToTop";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------
import api from "./api/api";

// ----------------------------------------------------------------------

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("user-token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.setItem("user-token", "");
      localStorage.setItem("role", "");
    } else if (error?.response?.status === 500) {
      console.log("error", error);
      //window.location='/500';
    } else {
    }

    return Promise.reject(error);
  }
);
export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <Router />
    </ThemeConfig>
  );
}
