import React, { Component } from 'react';
import { GetUserLogin } from '../../../../services';
import { NotificationManager } from "react-notifications";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            email: null,
            password: null,
            formErrors: {
                firstName: "",
                email: "",
                password: ""
            }
        };
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        let { firstName, email, password, gender } = this.state;
        let data = { firstName: firstName, email: email, password: password, gender: gender }
        if (formValid(this.state)) {
            let list = await GetUserLogin.getUserRegister(data);
            if (list) {
                NotificationManager.success("Successfully Added New User");
                window.location.href="/login";
            }
        } else {
            NotificationManager.error("Please check your Register", "Input Error");
        }

    }
    render() {
        let { firstName, email, password, formErrors } = this.state;
        return (
            <div className="card checkout-step-one">
                <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <span className="number">1</span> Login or SignUp
                        </button>
                    </h5>
                </div>
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="login-modal login-page-bk">
                                    <div className="row">
                                        <div className="col-lg-6 pad-right-0">
                                            <div className="login-modal-left">
                                            </div>
                                        </div>
                                        <div className="col-lg-6 pad-left-0">
                                            <form onSubmit={this.handleSubmit} noValidate>
                                                <h5 className="heading-design-h5">Register Now!</h5>
                                                <fieldset className="form-group">
                                                    <label>First Name</label>
                                                    <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
                                                    {formErrors.firstName.length > 0 && (
                                                        <span className="errorMessage">{formErrors.firstName}</span>
                                                    )}
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <label>Enter Email/Mobile number</label>
                                                    <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                                                    {formErrors.email.length > 0 && (
                                                        <span className="errorMessage">{formErrors.email}</span>
                                                    )}
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <label>Enter Password</label>
                                                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                                    {formErrors.password.length > 0 && (
                                                        <span className="errorMessage">{formErrors.password}</span>
                                                    )}
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <button type="submit" className="btn btn-lg btn-secondary btn-block" onClick={this.handleSubmit}>Create Your Account</button>
                                                </fieldset>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck2" />
                                                    <label className="custom-control-label" htmlFor="customCheck2">I Agree with <a href="#">Term and Conditions</a></label>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
