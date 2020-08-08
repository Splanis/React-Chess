import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import { ChessProvider } from "./context/store";
import Routes from "./routes";
import "./index.css";

ReactDOM.render(
    <ChessProvider>
        <Router>
            <Routes />
        </Router>
    </ChessProvider>,
    document.getElementById("root")
);
