import React from "react";
import ReactDOM from "react-dom/client"; // ← notice the '/client'
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
