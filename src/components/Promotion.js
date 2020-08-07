import React from "react";

import { promotionSelections } from "./initialBoard";
import * as actions from "../context/actionTypes";

const Promotion = ({
    // board, setBoard, promotion, setPromotion
    state,
    dispatch,
}) => {
    const { promotion, board } = state;
    const handleSelection = (e) => {
        const updateBoard = [...board];
        updateBoard[promotion.position[0]][promotion.position[1]] =
            promotionSelections[e.target.value][promotion.color];

        dispatch({
            type: actions.PROMOTE_PAWN,
            payload: updateBoard,
        });
    };

    return (
        <div style={{ display: "flex-column" }}>
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
        </div>
    );
};

export default Promotion;
