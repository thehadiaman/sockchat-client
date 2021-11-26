import React from "react";
import {Button} from "@mui/material";
import Form from "./common/form";
import Joi from "joi-browser";
import {login} from "../services/auth";

class Login extends Form {

    state={
        inputs:[{name: 'id', type: 'text', value: '', label: "Email address or username", error: "", btnDisabled: true},
            {name: 'password', type: 'password', value: '', label: "Password", error: "", btnDisabled: true}],
        snackMessage: null
    }

    schema={
        id: Joi.string().min(3).max(50).required().label('Email address or username'),
        password: Joi.string().min(6).max(50).required().label('Password'),
    };

    doChange=()=>{
        return null;
    }

    doSubmit=async(values)=>{
        try{
            const data = await login(values);
            const token = data.headers['x-auth-token'];
            localStorage.setItem('jwtToken', token);
            window.location = '/';
        }catch (ex) {
            this.setState({snackMessage: ex.response.data});
        }
        this.setState({btnDisabled: false});
    }

    render() {
        document.title = "Login";
        const {inputs, btnDisabled} = this.state;
        const button = <Button type={'submit'} disabled={this.btnDisabled()||btnDisabled} variant={'contained'} fullWidth style={{margin: '0 0 10px 0'}}>Login</Button>;
        return <form onSubmit={this.handleSubmit}>
            {this.renderInput(inputs, button)}
        </form>;
    }
}

export default Login;