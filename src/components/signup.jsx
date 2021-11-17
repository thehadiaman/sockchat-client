import React from "react";
import {Button} from "@mui/material";
import Form from "./common/form";
import Joi from "joi-browser";

class SignUp extends Form {

    state={
        inputs:[
            {name: 'email', type: 'email', value: '', label: "Email address"},
            {name: 'name', type: 'name', value: '', label: "Full name"},
            {name: 'username', type: 'text', value: '', label: "Username"},
            {name: 'password', type: 'password', value: '', label: "Password"}
        ],
        errors: {},
        disableSubmit: true
    }

    getKeys=()=>{
        return ['email', 'name', 'username', 'password'];
    }

    schema={
        email: Joi.string().min(8).max(50).required().email().label('Email'),
        name: Joi.string().min(3).max(50).required().label('Full Name'),
        username: Joi.string().min(3).max(50).required().label('Username'),
        password: Joi.string().min(6).max(50).required().label('Password'),
    };

    render() {
        const {inputs} = this.state;
        const button = <Button type={'submit'} variant={'contained'} fullWidth style={{margin: '0 0 10px 0'}}>Signup</Button>;
        return <form  onSubmit={this.handleSubmit}>
            {this.renderInput(inputs, button)}
        </form>;
    }
}

export default SignUp;