import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { login, clearErrors } from "../../actions/authActions";
import { setAlert } from "../../actions/alertActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Login = ({ auth: { error, isAuthenticated }, login, clearErrors, setAlert }) => {
    let history = useHistory();
    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        }

        if (error === "Invalid Credentials") {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated]);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (email === "" || password === "") {
            setAlert("Please fill in all fields", "danger");
        } else {
            login({
                email,
                password
            });
        }
    };

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <input
                    type="submit"
                    value="Login"
                    className="btn btn-primary btn-block"
                />
            </form>
        </div>
    );
};

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { login, clearErrors, setAlert }
)(Login);
