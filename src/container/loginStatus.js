import { connect } from "react-redux";

import Login from "../components/login";

const mapStateToProps = (state, ownProps) => {
  return {
    online: state.userInfo.id ? true : false,
    name: state.userInfo.name,
    gender: state.userInfo.gender,
  };
};

const LoginStatus = connect(mapStateToProps)(Login);

export default LoginStatus;
