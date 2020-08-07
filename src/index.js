import React from "react";
import ReactDOM from "react-dom";

import Dashboard from "./components/Dashboard";
import "./index.css";
import { ChessProvider } from "./context/store";

ReactDOM.render(
    <React.StrictMode>
        <ChessProvider>
            <Dashboard />
        </ChessProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
