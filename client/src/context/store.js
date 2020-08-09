import React, { useReducer, createContext, useEffect } from "react";

import { chessReducer } from "./reducers";
import { initialBoard } from "./initialBoard";
import * as actions from "./actionTypes";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")),
    game: {
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
    },
};

export const ChessContext = createContext([]);

export const ChessProvider = (props) => {
    const [state, dispatch] = useReducer(chessReducer, initialState);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <ChessContext.Provider value={[state, dispatch]}>{props.children}</ChessContext.Provider>
    );
};
