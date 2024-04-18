import React from "react";
import ReactDOM from "react-dom/client";

import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithNavigate from "./auth/auth0-provider-with-navigate";
import QueryProvider from "./providers/query-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryProvider>
        <Auth0ProviderWithNavigate>
          <AppRoutes />
        </Auth0ProviderWithNavigate>
      </QueryProvider>
    </Router>
  </React.StrictMode>
);
