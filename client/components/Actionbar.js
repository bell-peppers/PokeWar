import React, {useState, useEffect} from "react";
import {connect} from "react-redux";

const Actionbar = (props) => {
  return <div style={{display: "flex"}}></div>;
};
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(Actionbar);
