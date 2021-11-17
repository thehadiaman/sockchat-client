import React from "react";
import {Button} from "@mui/material";
import Form from "./common/form";
import Joi from "joi-browser";

class Login extends Form {

    state={
        inputs:[{name: 'id', type: 'text', value: '', label: "Email address or username"},
            {name: 'password', type: 'password', value: '', label: "Password"}],
        errors: {}
    }

    getKeys=()=>{
        return ['id', 'password'];
    }

    schema={
        id: Joi.string().min(3).max(50).required().email().label('Email address or username'),
        password: Joi.string().min(6).max(50).required().label('Password'),
    };

    render() {
        const {inputs} = this.state;
        const button = <Button type={'submit'} variant={'contained'} fullWidth style={{margin: '0 0 10px 0'}}>Login</Button>;
        return <form onSubmit={this.handleSubmit}>
            {this.renderInput(inputs, button)}
        </form>;
    }
}

export default Login;