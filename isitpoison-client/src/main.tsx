import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";

import App from "./components/App";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
