import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { successLogin, logout } from "../actions";
import React from "react";
import { Formik } from "formik";
class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: "",
        password: "",
      },
      isLoginError: false,
    };
  }

  textChangeHandler(e, key) {
    let update = this.state.form;
    update[key] = e.target.value;
    this.setState({ form: update });
  }
  checkAccount() {
    const { email, password } = this.state.form;
    if (email === "henry.wu@ucfunnel.com" && password === "Asdf1234") {
      this.setState({ isLoginError: false, form: { email: "", password: "" } });
      this.props.dispatch(
        successLogin({ name: "henry", id: "aej1o2ij31", gender: "boy" })
      );
      return;
    }
    this.setState({ isLoginError: true });
  }
  logoutAccount() {
    this.props.dispatch(logout());
  }
  validate(values) {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  }

  render() {
    let offline = (
      <div>
        <div> Login </div>
        <Formik
          initialValues={this.state.form}
          validate={(values) => {
            return this.validate(values);
          }}
        >
          {({ values, errors, handleChange }) => (
            <div>
              <div className="Login-box">
                <TextField
                  autoComplete="off"
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  value={values.email}
                  onChange={(e) => {
                    this.textChangeHandler(e, "email");
                    handleChange(e);
                  }}
                />
                <div className="validate-error"> {errors.email} </div>
              </div>

              <div className="Login-box">
                <TextField
                  autoComplete="off"
                  fullWidth
                  id="password"
                  label="Password"
                  variant="outlined"
                  value={values.password}
                  onChange={(e) => this.textChangeHandler(e, "password")}
                />
              </div>
            </div>
          )}
        </Formik>
        {this.state.isLoginError && (
          <div className="login-error"> wrong email or password </div>
        )}
        <Button onClick={() => this.checkAccount()}> login </Button>{" "}
      </div>
    );
    let online = (
      <div>
        <div>WelCome, {this.props.name}</div>
        <Button onClick={() => this.logoutAccount()}> logout </Button>{" "}
      </div>
    );

    return <div>{this.props.online ? online : offline}</div>;
  }
}

export default login;
