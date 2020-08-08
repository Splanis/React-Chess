import React from "react";

import * as actions from "../context/actionTypes";

import styled from "styled-components";

const Piece = ({ isPromotion, position, piece, dispatch, state }) => {
    const { playersTurn, moving } = state;

    const handleMove = () => {
        if (JSON.stringify(position) === JSON.stringify(moving)) {
            dispatch({ type: actions.SET_MOVING, payload: null });
            return;
        }

        if (
            (playersTurn === "white" && piece.color === "black") ||
            (playersTurn === "black" && piece.color === "white") ||
            isPromotion
        )
            return;

        dispatch({ type: actions.SET_MOVING, payload: position });
    };

    return (
        <PieceStyled
            style={{
                color: piece.color,
                fontSize: 86,
                textShadow:
                    piece.color === "black"
                        ? "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff"
                        : "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
            onClick={handleMove}
        >
            {piece.symbol}
        </PieceStyled>
    );
};

const PieceStyled = styled.div`
    &:hover {
        cursor: pointer;
    }
    user-select: none;
    z-index: 10;
`;

export default Piece;
