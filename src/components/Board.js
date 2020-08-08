import React, { useEffect, useContext } from "react";

import Square from "./Square";
import Promotion from "./Promotion";
import { ChessContext } from "../context/store";
import { legalMove, isCheckMate, isCheck } from "../rules/rules";
import * as actions from "../context/actionTypes";

import styled from "styled-components";

const boardChars = ["A", "B", "C", "D", "E", "F", "G", "H"];
const boardNums = ["8", "7", "6", "5", "4", "3", "2", "1"];

const findLegalMoves = (moving, board, playersTurn) => {
    const piece = board[moving[0]][moving[1]];
    let legalMoves = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (legalMove(piece, moving, [i, j], board)[0]) {
                const tmpBoard = JSON.parse(JSON.stringify(board));
                tmpBoard[i][j] = tmpBoard[moving[0]][moving[1]];
                tmpBoard[i][j].moved = true;
                tmpBoard[moving[0]][moving[1]] = { isEmpty: true };

                if (!isCheck(tmpBoard, playersTurn)) legalMoves.push([i, j]);
            }
        }
    }

    return legalMoves;
};

const Board = () => {
    const [state, dispatch] = useContext(ChessContext);
    const { board, moving, promotion, playersTurn } = state;

    useEffect(() => {
        if (moving) {
            const moves = findLegalMoves(moving, board, playersTurn);
            dispatch({ type: actions.ADD_POSSIBLE_MOVES, payload: moves });
        } else {
            dispatch({ type: actions.CLEAR_POSSIBLE_MOVES });
        }
    }, [moving]);

    useEffect(() => {
        const blackPromotion = board[0].findIndex((piece) => piece.type === "pawn");
        const whitePromotion = board[7].findIndex((piece) => piece.type === "pawn");

        if (blackPromotion > -1) {
            dispatch({
                type: actions.ADD_PROMOTION,
                payload: { color: "black", position: [0, blackPromotion] },
            });
        } else if (whitePromotion > -1) {
            dispatch({
                type: actions.ADD_PROMOTION,
                payload: { color: "white", position: [7, whitePromotion] },
            });
        }

        if (isCheckMate(board, playersTurn)) {
            dispatch({
                type: actions.SET_CHECKMATE,
                payload: playersTurn,
            });
        }
    }, [board]);

    return (
        <GameStyled>
            <CoordinatesStyled area="top">
                {boardChars.map((char) => {
                    return <BoardCoordinatesStyled key={char}>{char}</BoardCoordinatesStyled>;
                })}
            </CoordinatesStyled>

            <CoordinatesStyled area="left" aside="true">
                {boardNums.map((num) => {
                    return <BoardCoordinatesStyled key={num}>{num}</BoardCoordinatesStyled>;
                })}
            </CoordinatesStyled>

            <BoardStyled>
                {board.map((row, i) => {
                    return row.map((col, j) => {
                        return (
                            <Square
                                key={i + j}
                                position={[i, j]}
                                state={state}
                                dispatch={dispatch}
                                isPromotion={promotion.color ? true : false}
                            />
                        );
                    });
                })}
            </BoardStyled>

            <CoordinatesStyled area="right" aside="true">
                {boardNums.map((num) => {
                    return <BoardCoordinatesStyled key={num}>{num}</BoardCoordinatesStyled>;
                })}
            </CoordinatesStyled>

            <CoordinatesStyled area="bot">
                {boardChars.map((char) => {
                    return <BoardCoordinatesStyled key={char}>{char}</BoardCoordinatesStyled>;
                })}
            </CoordinatesStyled>

            {promotion.color && <Promotion state={state} dispatch={dispatch} />}
        </GameStyled>
    );
};

const GameStyled = styled.div`
    display: grid;
    grid-template-columns: 50px 800px 50px;
    grid-template-rows: 50px 800px 50px;
    grid-template-areas:
        "top top top"
        "left board right"
        "bot bot bot";
`;

const BoardStyled = styled.div`
    width: 800px;
    display: grid;
    grid-gap: 0;
    grid-template-columns: repeat(8, 100px);
    grid-template-rows: repeat(8, 100px);
    grid-auto-flow: row;
    grid-area: board;
`;

const BoardCoordinatesStyled = styled.div`
    font-weight: 600;
    font-size: 26px;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoordinatesStyled = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: black;
    color: white;
    padding-left: ${(props) => !props.aside && "50px"};
    padding-right: ${(props) => !props.aside && "50px"};
    flex-direction: ${(props) => props.aside && "column"};
    grid-area: ${(props) => props.area};
`;

export default Board;
