import * as actions from "./actionTypes";

export const chessReducer = (state, { type, payload }) => {
    switch (type) {
        case actions.ADD_POSSIBLE_MOVES:
            return { ...state, possibleMoves: payload };
        case actions.CLEAR_POSSIBLE_MOVES:
            return { ...state, possibleMoves: [] };
        case actions.MOVE_PIECE:
            const { from, to, board, symbol } = payload;

            const fromRow = Math.abs(from[0] - 8);
            const fromCol = Math.abs(from[1] + 1);
            const toRow = Math.abs(to[0] - 8);
            const toCol = Math.abs(to[1] + 1);

            const fromColStr = String.fromCharCode(fromCol.toString().charCodeAt(0) + 16);
            const toColStr = String.fromCharCode(toCol.toString().charCodeAt(0) + 16);

            const move = [fromColStr + fromRow, toColStr + toRow];

            return { ...state, board, moving: null, moves: [...state.moves, { move, symbol }] };
        case actions.ADD_PROMOTION:
            return { ...state, promotion: payload };
        case actions.PROMOTE_PAWN:
            return {
                ...state,
                board: payload,
                promotion: {
                    position: [],
                    color: "",
                },
            };
        case actions.ADD_MOVING:
            return { ...state, moving: payload };
        case actions.CLEAR_MOVING:
            return { ...state, moving: null };
        case actions.TOGGLE_PLAYERS_TURN:
            return { ...state, playersTurn: payload };
        case actions.SET_CHECKMATE:
            return { ...state, winner: payload === "white" ? "black" : "white" };
        default:
            break;
    }
};
