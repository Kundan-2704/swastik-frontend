

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




import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./Redux Toolkit/Store";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";

// 🔥 VERY IMPORTANT (browser ko interfere karne se roko)
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(
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
