import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/NavBar";
import Home from "./components/pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";
import { Provider } from 'react-redux';
import store from './store';

import "./App.css";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <div className="container">
                        <Alerts />
                        <Switch>
                            <PrivateRoute exact path="/" component={Home} />
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route exact path="/login" component={Login} />
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        </Provider>
    );
}

export default App;
