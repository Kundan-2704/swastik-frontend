

// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.tsx';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './Redux Toolkit/Store.ts';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Provider store={store}>
//         <App />
//       </Provider>

//     </BrowserRouter>
//   </StrictMode>,
// );



// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./Redux Toolkit/Store";
// import SmoothScrollProvider from "./providers/SmoothScrollProvider";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <SmoothScrollProvider>
//       <BrowserRouter>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </BrowserRouter>
//     </SmoothScrollProvider>
//   </StrictMode>
// );



// import React from "react";

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";

// import "./index.css";
// import App from "./App";
// import store from "./Redux Toolkit/Store";
// import SmoothScrollProvider from "./providers/SmoothScrollProvider";

// // 🔥 VERY IMPORTANT (browser ko interfere karne se roko)
// if ("scrollRestoration" in window.history) {
//   window.history.scrollRestoration = "manual";
// }

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Provider store={store}>
//         <SmoothScrollProvider>
//           <App />
//         </SmoothScrollProvider>
//       </Provider>
//     </BrowserRouter>
//   </StrictMode>
// );







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
