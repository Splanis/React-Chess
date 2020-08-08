import React from "react";

import Piece from "./Piece";
import { legalMove, isCheck } from "../rules/rules";
import { promotionSelections } from "../context/initialBoard";
import * as actions from "../context/actionTypes";

import styled from "styled-components";

const Square = ({ position, state, dispatch }) => {
    const { moving, board, playersTurn, isPromotion, legalMoves } = state.game;

    const handleMovePiece = () => {
        if (moving) {
            if (JSON.stringify(position) === JSON.stringify(moving)) return;

            const piece = board[moving[0]][moving[1]];

            if (legalMove(piece, moving, position, board, playersTurn)[0]) {
                const tmpBoard = JSON.parse(JSON.stringify(board));
                tmpBoard[position[0]][position[1]] = piece;
                piece.moved = true;
                tmpBoard[moving[0]][moving[1]] = { isEmpty: true };

                if (legalMove(piece, moving, position, board, playersTurn)[1] === "castlingRight") {
                    tmpBoard[moving[0]][7] = { isEmpty: true };
                    tmpBoard[moving[0]][moving[1] + 1] = promotionSelections.rook[playersTurn];
                }
                if (legalMove(piece, moving, position, board, playersTurn)[1] === "castlingLeft") {
                    tmpBoard[moving[0]][0] = { isEmpty: true };
                    tmpBoard[moving[0]][moving[1] - 1] = promotionSelections.rook[playersTurn];
                }

                if (!isCheck(tmpBoard, playersTurn)) {
                    dispatch({
                        type: actions.MOVE_PIECE,
                        payload: {
                            board: tmpBoard,
                            from: moving,
                            to: position,
                            symbol: piece.symbol,
                        },
                    });

                    playersTurn === "white"
                        ? dispatch({ type: actions.TOGGLE_PLAYERS_TURN, payload: "black" })
                        : dispatch({ type: actions.TOGGLE_PLAYERS_TURN, payload: "white" });
                } else {
                    dispatch({ type: actions.SET_MOVING, payload: null });
                }
            }
        }
    };

    const isLegalMove = () => {
        return legalMoves.find((square) => square[0] === position[0] && square[1] === position[1]);
    };

    return (
        <SquareStyled
            style={{
                background:
                    JSON.stringify(position) === JSON.stringify(moving)
                        ? "#BDB246"
                        : (position[0] + position[1]) % 2 === 0
                        ? "white"
                        : "#585858",
            }}
            onClick={handleMovePiece}
        >
            <Piece
                piece={board[position[0]][position[1]]}
                position={position}
                state={state}
                dispatch={dispatch}
                isPromotion={isPromotion}
            />
            <LegalMoveCircle style={{ display: isLegalMove() ? "flex" : "none" }}></LegalMoveCircle>
        </SquareStyled>
    );
};

const SquareStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const LegalMoveCircle = styled.span`
    background: grey;
    padding: 16px;
    border-radius: 50%;
    position: absolute;
    z-index: 1;
`;

export default Square;
