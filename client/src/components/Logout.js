import { useContext, useEffect } from "react";

import { ChessContext } from "../context/store";
import * as actions from "../context/actionTypes";

const Logout = () => {
    const [state, dispatch] = useContext(ChessContext);

    useEffect(() => {
        dispatch({ type: actions.USER_LOGOUT });
    }, []);

    return null;
};

export default Logout;
