import React from "react";

import Board from "./Board";
import Panel from "./Panel";
import Promotion from "./Promotion";

const Dashboard = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100%",
                position: "relative",
            }}
        >
            <Board />
            <Panel />
            <Promotion />
        </div>
    );
};

export default Dashboard;
