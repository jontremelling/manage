import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Alerts = ({ alert: { alerts } }) => {

  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' /> {alert.msg}
      </div>
    ))
  );
};

Alerts.propTypes = {
    alert: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    alert: state.alert
});

export default connect(
    mapStateToProps,
    { }
)(Alerts);
