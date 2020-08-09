import * as actions from "./actionTypes";

export const chessReducer = (state, { type, payload }) => {
    switch (type) {
        case actions.SET_LEGAL_MOVES:
            return { ...state, game: { ...state.game, legalMoves: payload } };
        case actions.MOVE_PIECE:
            const { from, to, board, symbol } = payload;

            const fromRow = Math.abs(from[0] - 8);
            const fromCol = Math.abs(from[1] + 1);
            const toRow = Math.abs(to[0] - 8);
            const toCol = Math.abs(to[1] + 1);

            const fromColStr = String.fromCharCode(fromCol.toString().charCodeAt(0) + 16);
            const toColStr = String.fromCharCode(toCol.toString().charCodeAt(0) + 16);

            const move = [fromColStr + fromRow, toColStr + toRow];

            return {
                ...state,
                game: {
                    ...state.game,
                    board,
                    moving: null,
                    moves: [...state.game.moves, { move, symbol }],
                },
            };
        case actions.ADD_PROMOTION:
            return { ...state, game: { ...state.game, promotion: payload } };
        case actions.PROMOTE_PAWN:
            return {
                ...state,
                game: {
                    ...state.game,
                    board: payload,
                    promotion: {
                        position: [],
                        color: "",
                    },
                },
            };
        case actions.SET_MOVING:
            return { ...state, game: { ...state.game, moving: payload } };
        case actions.TOGGLE_PLAYERS_TURN:
            return { ...state, game: { ...state.game, playersTurn: payload } };
        case actions.SET_CHECKMATE:
            return {
                ...state,
                game: { ...state.game, winner: payload === "white" ? "black" : "white" },
            };
        case actions.USER_AUTHENTICATED:
            return { ...state, user: payload };
        case actions.USER_LOGOUT:
            return { ...state, user: { Authorization: null } };
        default:
            break;
    }
};
