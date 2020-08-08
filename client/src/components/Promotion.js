import React, { useContext } from "react";

import { promotionSelections } from "../context/initialBoard";
import { ChessContext } from "../context/store";
import * as actions from "../context/actionTypes";

import styled from "styled-components";

const Promotion = () => {
    const [state, dispatch] = useContext(ChessContext);
    const { promotion, board } = state;

    console.log(promotion);

    const handleSelection = (e) => {
        const tmpBoard = JSON.parse(JSON.stringify(board));
        tmpBoard[promotion.position[0]][promotion.position[1]] =
            promotionSelections[e.target.value][promotion.color];

        dispatch({
            type: actions.PROMOTE_PAWN,
            payload: tmpBoard,
        });
    };

    return (
        <PromotionStyled style={{ display: promotion.color ? "flex" : "none" }}>
            <h1>Select Pawn Promotion</h1>
            <button onClick={handleSelection} value="queen">
                Queen
            </button>
            <button onClick={handleSelection} value="rook">
                Rook
            </button>
            <button onClick={handleSelection} value="bishop">
                Bishop
            </button>
            <button onClick={handleSelection} value="knight">
                Knight
            </button>
        </PromotionStyled>
    );
};

const PromotionStyled = styled.div`
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    background: white;
    border: 1px solid black;

    button {
        margin: 5px;
        width: 85px;
        padding: 5px 10px;
        font-size: 20px;
        border: none;
        background: lightgrey;
        border-radius: 8px;

        &:hover {
            cursor: pointer;
            background: grey;
        }
    }
`;

export default Promotion;
