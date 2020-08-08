import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { ChessContext } from "../context/store";
import * as actions from "../context/actionTypes";
import {
    PageStyled,
    FormStyled,
    ButtonStyled,
    InputStyled,
    RegisterHereStyled,
    ErrorsStyled,
} from "../styles/sharedStyles";

const Login = () => {
    const [state, dispatch] = useContext(ChessContext);
    const [values, setValues] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(values),
        });

        const Authorization = response.headers.get("Authorization");
        const data = await response.json();

        if (response.status === 400) {
            setError(data.message);
        } else {
            dispatch({
                type: actions.USER_AUTHENTICATED,
                payload: { ...data.userProfile, Authorization },
            });
        }
    };

    return (
        <PageStyled>
            <FormStyled onSubmit={handleSubmit}>
                <h1 style={{ marginBottom: 10 }}>Login</h1>

                <div>
                    <InputStyled
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <InputStyled
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    <ErrorsStyled>{error}</ErrorsStyled>
                </div>

                <ButtonStyled type="submit">Login</ButtonStyled>
                <RegisterHereStyled>
                    Don't have an account? Register{" "}
                    <Link to="/register" style={{ color: "blue" }}>
                        Here
                    </Link>
                </RegisterHereStyled>
            </FormStyled>
        </PageStyled>
    );
};

export default Login;
