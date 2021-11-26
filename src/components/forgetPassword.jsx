import React from "react";
import {Button} from "@mui/material";
import Form from "./common/form";
import Joi from "joi-browser";
import {checkId, generateResetPasswordLink} from "../services/userService";

class ForgetPassword extends Form {

    state={
        inputs:[
            {name: 'id', type: 'text', value: '', label: "Email address or username", error: "", btnDisabled: true}
        ],
        snackMessage: null
    }

    schema={
        id: Joi.string().min(3).max(50).required().label('Email address of username')
    };

    doChange=async({name, value})=>{
        const inputs = this.state.inputs;
        const data = (await checkId(value)).data;
        if(!data){
            const input = inputs.find(input=>input.name===name);
            input.btnDisabled = true;
            input.error = `No user found.`
            this.setState({inputs});
        }
    }

    doSubmit=async(values)=>{
        try{
            const data = (await generateResetPasswordLink(values)).data;
            this.setState({snackMessage: data});
        }catch (ex) {
            this.setState({snackMessage: ex.response.data});
        }
    }

    render() {
        document.title = "Forget Password";
        const {inputs, btnDisabled} = this.state;
        const button = <Button disabled={this.btnDisabled()||btnDisabled} type={'submit'} variant={'contained'} fullWidth style={{margin: '0 0 10px 0'}}>Send Login Link</Button>;
        return <form  onSubmit={this.handleSubmit}>
            {this.renderInput(inputs, button)}
        </form>;
    }
}

export default ForgetPassword;