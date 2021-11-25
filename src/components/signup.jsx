import React from "react";
import {Button} from "@mui/material";
import Form from "./common/form";
import Joi from "joi-browser";
import {checkId, signup} from "../services/userService";

class SignUp extends Form {

    state={
        inputs:[
            {name: 'email', type: 'email', value: '', label: "Email address", error: "", btnDisabled: true},
            {name: 'name', type: 'name', value: '', label: "Full name", error: "", btnDisabled: true},
            {name: 'username', type: 'text', value: '', label: "Username", error: "", btnDisabled: true},
            {name: 'password', type: 'password', value: '', label: "Password", error: "", btnDisabled: true}
        ]
    }

    schema={
        email: Joi.string().min(8).max(50).required().email().label('Email'),
        name: Joi.string().min(3).max(50).required().label('Full Name'),
        username: Joi.string().min(3).max(50).required().label('Username'),
        password: Joi.string().min(6).max(50).required().label('Password'),
    };

    doChange=async({name, value})=>{
        if(['email', 'username'].includes(name)){
            const inputs = this.state.inputs;
            const data = (await checkId(value)).data;
            if(data){
                const input = inputs.find(input=>input.name===name);
                input.btnDisabled = true;
                input.error = `${name} already used.`
                this.setState({inputs});
            }
        }
    }

    doSubmit=async(values)=>{
        try{
            const data = await signup(values);
            const token = data.headers['x-auth-token'];
            localStorage.setItem('jwtToken', token);
            document.location='/verification'
        }catch (ex) {
            this.props.setError({message: ex.response.data});
        }
        this.setState({btnDisabled: false});
    }

    render() {
        document.title = "Signup";
        const {inputs, btnDisabled} = this.state;
        const button = <Button disabled={this.btnDisabled()||btnDisabled} type={'submit'} variant={'contained'} fullWidth style={{margin: '0 0 10px 0'}}>Signup</Button>;
        return <form  onSubmit={this.handleSubmit}>
            {this.renderInput(inputs, button)}
        </form>;
    }
}

export default SignUp;