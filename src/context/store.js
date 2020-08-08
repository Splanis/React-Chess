import React, { useReducer, createContext } from "react";

import { chessReducer } from "./reducers";
import { initialBoard } from "./initialBoard";

const initialState = {
    board: initialBoard,
    moving: null,
    legalMoves: [],
    moves: [],
    playersTurn: "white",
    promotion: {
        position: [],
        color: "",
    },
    checkMate: false,
    winner: null,
};

export const ChessContext = createContext([]);

export const ChessProvider = (props) => {
    const [state, dispatch] = useReducer(chessReducer, initialState);

    return (
        <ChessContext.Provider value={[state, dispatch]}>{props.children}</ChessContext.Provider>
    );
};
