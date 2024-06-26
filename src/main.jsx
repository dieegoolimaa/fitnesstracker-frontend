import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App.jsx";
import SessionContextProvider from "./contexts/SessionContext.jsx";
import { BrowserRouter } from "react-router-dom";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import theme from "./styles/theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionContextProvider>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </SessionContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
