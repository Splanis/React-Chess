import React, { useState, useContext } from "react";

import { ChessContext } from "../context/store";
import * as actions from "../context/actionTypes";
import {
    PageStyled,
    FormStyled,
    ButtonStyled,
    InputStyled,
    ErrorsStyled,
} from "../styles/sharedStyles";

const Register = () => {
    const [state, dispatch] = useContext(ChessContext);
    const [values, setValues] = useState({ email: "", username: "", password: "", password2: "" });
    const [errors, setErrors] = useState({ email: "", username: "", password: "", password2: "" });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = { email: "", username: "", password: "" };

        if (!values.password) {
            errors.password = "Password is required.";
        }
        if (!values.email) {
            errors.email = "Email is required.";
        }
        if (!values.username) {
            errors.username = "Username is required.";
        }

        if (!values.email || !values.username || !values.password) {
            setErrors(errors);
            return;
        }

        if (values.password === values.password2) {
            const response = await fetch("api/user/register", {
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
                setErrors(data.message);
            } else {
                dispatch({
                    type: actions.USER_AUTHENTICATED,
                    payload: { ...data.userProfile, Authorization },
                });
            }
        } else {
            setErrors({ ...errors, password2: "Passwords are not the same." });
        }
    };

    return (
        <PageStyled>
            <FormStyled onSubmit={handleSubmit}>
                <h1 style={{ marginBottom: 10 }}>Register</h1>

                <div>
                    <InputStyled
                        type="email"
                        name="email"
                        value={values.email}
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <ErrorsStyled> {errors.email}</ErrorsStyled>
                </div>

                <div>
                    <InputStyled
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                    />
                    <ErrorsStyled> {errors.username}</ErrorsStyled>
                </div>

                <div>
                    <InputStyled
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    <ErrorsStyled> {errors.password}</ErrorsStyled>
                </div>

                <div>
                    <InputStyled
                        type="password"
                        name="password2"
                        placeholder="Repeat Password"
                        value={values.password2}
                        onChange={handleChange}
                    />
                    <ErrorsStyled> {errors.password2}</ErrorsStyled>
                </div>

                <ButtonStyled type="submit">Register</ButtonStyled>
            </FormStyled>
        </PageStyled>
    );
};

export default Register;
