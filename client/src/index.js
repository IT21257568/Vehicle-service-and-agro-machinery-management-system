import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AllContextProvider } from "./context/AllContext";
//import "bootstrap/dist/css/bootstrap.min.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AllContextProvider>
      <App />
    </AllContextProvider>
  </React.StrictMode>
);
