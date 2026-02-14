

import * as React from "react";
(window as any).React = React;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./Redux Toolkit/Store";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";

// 🔥 stop browser auto scroll restore
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SmoothScrollProvider>
          <App />
        </SmoothScrollProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
