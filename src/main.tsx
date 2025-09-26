import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import AppRouter from "./AppRouter";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
