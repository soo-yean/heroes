import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard.tsx";
import HeroesList from "./Components/HeroesList.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Redirect to dashboard when the user visits the root */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/heroes" element={<HeroesList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
