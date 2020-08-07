const rookRules = (from, to, board) => {
    if ((from[0] === to[0] && from[1] !== to[1]) || (from[0] !== to[0] && from[1] === to[1])) {
        if (from[0] > to[0] && from[1] === to[1]) {
            for (let i = from[0] - 1; i > to[0]; i--) {
                if (!board[i][from[1]].isEmpty) {
                    return false;
                }
            }
        } else if (from[0] < to[0] && from[1] === to[1]) {
            for (let i = from[0] + 1; i < to[0]; i++) {
                if (!board[i][from[1]].isEmpty) {
                    return false;
                }
            }
        } else if (from[0] === to[0] && from[1] > to[1]) {
            for (let i = from[1] - 1; i > to[1]; i--) {
                if (!board[from[0]][i].isEmpty) {
                    return false;
                }
            }
        } else if (from[0] === to[0] && from[1] < to[1]) {
            for (let i = from[1] + 1; i < to[1]; i++) {
                if (!board[from[0]][i].isEmpty) {
                    return false;
                }
            }
        }

        return true;
    }

    return false;
};

const bishopRules = (from, to, board) => {
    if (Math.abs(from[0] - to[0]) === Math.abs(from[1] - to[1])) {
        if (from[0] > to[0] && from[1] > to[1]) {
            for (let i = from[0] - 1, j = from[1] - 1; i > to[0] && j > to[1]; i--, j--) {
                if (!board[i][j].isEmpty) {
                    return false;
                }
            }
        } else if (from[0] > to[0] && from[1] < to[1]) {
            for (let i = from[0] - 1, j = from[1] + 1; i > to[0] && j < to[1]; i--, j++) {
                if (!board[i][j].isEmpty) {
                    return false;
                }
            }
        } else if (from[0] < to[0] && from[1] < to[1]) {
            for (let i = from[0] + 1, j = from[1] + 1; i < to[0] && j < to[1]; i++, j++) {
                if (!board[i][j].isEmpty) {
                    return false;
                }
            }
        } else if (from[0] < to[0] && from[1] > to[1]) {
            for (let i = from[0] + 1, j = from[1] - 1; i < to[0] && j > to[1]; i++, j--) {
                if (!board[i][j].isEmpty) {
                    return false;
                }
            }
        }

        return true;
    }
    return false;
};

export const legalMove = (piece, from, to, board) => {
    if (piece.color === board[to[0]][to[1]].color) return false;
    if (JSON.stringify(from) === JSON.stringify(to)) return false;

    switch (piece.type) {
        case "pawn":
            if (piece.color === "black" && from[0] < to[0]) return false;
            else if (piece.color === "white" && from[0] > to[0]) return false;

            if (from[1] - to[1] === 0) {
                if (!board[to[0]][to[1]].isEmpty) return false;

                if (Math.abs(from[0] - to[0]) === 1 || Math.abs(from[0] - to[0]) === 2) {
                    if (!board[from[0]][from[1]].moved) {
                        if (Math.abs(from[0] - to[0]) === 1) {
                            if (piece.color === "black") {
                                if (board[from[0] - 1][from[1]].isEmpty) {
                                    return true;
                                }
                            } else {
                                if (board[from[0] + 1][from[1]].isEmpty) {
                                    return true;
                                }
                            }
                        } else if (Math.abs(from[0] - to[0]) === 2) {
                            if (piece.color === "black") {
                                if (
                                    board[from[0] - 2][from[1]].isEmpty &&
                                    board[from[0] - 1][from[1]].isEmpty
                                ) {
                                    return true;
                                }
                            } else {
                                if (
                                    board[from[0] + 2][from[1]].isEmpty &&
                                    board[from[0] + 1][from[1]].isEmpty
                                ) {
                                    return true;
                                }
                            }
                        }
                    } else if (Math.abs(from[0] - to[0]) === 1) {
                        return true;
                    }
                }
            } else if (
                Math.abs(from[1] - to[1]) === 1 &&
                Math.abs(from[0] - to[0]) === 1 &&
                !board[to[0]][to[1]].isEmpty
            ) {
                return true;
            }

            return false;
        case "bishop":
            return bishopRules(from, to, board);
        case "knight":
            if (
                (Math.abs(from[0] - to[0]) === 2 && Math.abs(from[1] - to[1]) === 1) ||
                (Math.abs(from[0] - to[0]) === 1 && Math.abs(from[1] - to[1]) === 2)
            ) {
                return true;
            }
            return false;
        case "rook":
            return rookRules(from, to, board);
        case "king":
            // if (
            //     !board[from[0]][from[1]].moved &&
            //     board[from[0]][from[1] + 1].isEmpty &&
            //     board[from[0]][from[1] + 2].isEmpty &&
            //     !board[from[0]][from[1] + 3].moved
            // ) {
            //     return "castling";
            // }
            if (
                (Math.abs(from[0] - to[0]) === 1 && Math.abs(from[1] - to[1]) === 1) ||
                (Math.abs(from[0] - to[0]) === 1 && Math.abs(from[1] - to[1]) === 0) ||
                (Math.abs(from[0] - to[0]) === 0 && Math.abs(from[1] - to[1]) === 1) ||
                (Math.abs(from[0] - to[0]) === 0 && Math.abs(from[1] - to[1]) === 0)
            )
                return true;

            return false;
        case "queen":
            return rookRules(from, to, board) || bishopRules(from, to, board);
        default:
            return false;
    }
};

export const isCheck = (board, playersTurn) => {
    let kingPosition;
    let stop = false;

    if (playersTurn === "white") {
        for (let i = 0; i < 8 && !stop; i++) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j].type === "king" && board[i][j].color === "white") {
                    kingPosition = [i, j];
                    stop = true;
                }
            }
        }
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (legalMove(board[i][j], [i, j], kingPosition, board)) {
                    return true;
                }
            }
        }
    } else {
        for (let i = 7; i >= 0 && !stop; i--) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j].type === "king" && board[i][j].color === "black") {
                    kingPosition = [i, j];
                    stop = true;
                }
            }
        }
        for (let i = 7; i >= 0; i--) {
            for (let j = 0; j < 8; j++) {
                if (legalMove(board[i][j], [i, j], kingPosition, board)) {
                    return true;
                }
            }
        }
    }

    return false;
};

export const isCheckMate = (board, playersTurn) => {
    if (playersTurn === "white") {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j].color === "white") {
                    for (let k = 0; k < 8; k++) {
                        for (let l = 0; l < 8; l++) {
                            if (legalMove(board[i][j], [i, j], [k, l], board)) {
                                const tmpBoard = JSON.parse(JSON.stringify(board));
                                tmpBoard[k][l] = tmpBoard[i][j];
                                tmpBoard[k][l].moved = true;
                                tmpBoard[i][j] = { isEmpty: true };

                                if (!isCheck(tmpBoard, playersTurn)) return true;
                            }
                        }
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j].color === "black") {
                    for (let k = 0; k < 8; k++) {
                        for (let l = 0; l < 8; l++) {
                            if (legalMove(board[i][j], [i, j], [k, l], board)) {
                                const tmpBoard = JSON.parse(JSON.stringify(board));
                                tmpBoard[k][l] = tmpBoard[i][j];
                                tmpBoard[k][l].moved = true;
                                tmpBoard[i][j] = { isEmpty: true };

                                if (!isCheck(tmpBoard, playersTurn)) return true;
                            }
                        }
                    }
                }
            }
        }
    }

    return false;
};
