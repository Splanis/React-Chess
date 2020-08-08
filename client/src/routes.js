import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "./components/Dashboard.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Logout from "./components/Logout.js";

import { ChessContext } from "./context/store";

const Routes = () => {
    const [state, dispatch] = useContext(ChessContext);

    const isUser = state.user.Authorization;

    if (isUser) {
        return (
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/logout" component={Logout} />
                <Redirect to="/" />
            </Switch>
        );
    } else {
        return (
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Redirect to="/login" />
            </Switch>
        );
    }
};

export default Routes;
