import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { login, loadUser, clearErrors } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ auth: { error, isAuthenticated, loading }, login, loadUser, clearErrors, component: Component, ...rest }) => {
  return (
    <Route
       {...rest}
       render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : 
        (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    props: state.props
});

export default connect(
    mapStateToProps,
    { login, loadUser, clearErrors }
)(PrivateRoute);
