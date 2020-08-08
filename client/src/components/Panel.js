import React, { useContext } from "react";

import { ChessContext } from "../context/store";

const Panel = () => {
    const [state, dispatch] = useContext(ChessContext);

    const { moves, playersTurn, winner } = state.game;

    return (
        <div style={{ width: 310, height: 900, border: "5px solid black", display: "flex-column" }}>
            <h1>It's {playersTurn[0].toUpperCase() + playersTurn.substr(1)}'s Turn</h1>
            <div style={{ overflowY: "scroll", height: 850 }}>
                {moves.map((move) => {
                    return (
                        <div key={move.move}>
                            {move.symbol}: {move.move[0] + " ->  " + move.move[1]}
                        </div>
                    );
                })}
                {winner && <div>Checkmate! {winner[0].toUpperCase() + winner.substr(1)} wins.</div>}
            </div>
        </div>
    );
};

export default Panel;
