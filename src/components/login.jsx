import React from "react";
import {Button} from "@mui/material";
import Form from "./common/form";
import Joi from "joi-browser";

class Login extends Form {

    state={
        inputs:[{name: 'id', type: 'text', value: '', label: "Email address or username"},
            {name: 'password', type: 'password', value: '', label: "Password"}],
        errors: {},
        btnDisabled: true
    }

    schema={
        id: Joi.string().min(3).max(50).required().label('Email address or username'),
        password: Joi.string().min(6).max(50).required().label('Password'),
    };

    doSubmit=()=>{
        console.log('');
    }

    render() {
        document.title = "Login";
        const {inputs, btnDisabled} = this.state;
        const button = <Button type={'submit'} disabled={btnDisabled} variant={'contained'} fullWidth style={{margin: '0 0 10px 0'}}>Login</Button>;
        return <form onSubmit={this.handleSubmit}>
            {this.renderInput(inputs, button)}
        </form>;
    }
}

export default Login;