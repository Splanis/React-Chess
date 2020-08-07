import React from "react";

import Board from "./Board";
import Panel from "./Panel";

const Dashboard = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100%",
            }}
        >
            <Board />
            <Panel />
        </div>
    );
};

export default Dashboard;
