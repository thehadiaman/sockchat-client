import React from "react";
import {Button} from "@mui/material";
import Form from "./common/form";
import Joi from "joi-browser";

class ForgetPassword extends Form {

    state={
        inputs:[
            {name: 'id', type: 'text', value: '', label: "Email address or username"}
        ],
        errors: {},
        btnDisabled: true
    }

    schema={
        id: Joi.string().min(3).max(50).required().label('Email address of username')
    };

    render() {
        document.title = "Forget Password";
        const {inputs, btnDisabled} = this.state;
        const button = <Button disabled={btnDisabled} type={'submit'} variant={'contained'} fullWidth style={{margin: '0 0 10px 0'}}>Send Login Link</Button>;
        return <form  onSubmit={this.handleSubmit}>
            {this.renderInput(inputs, button)}
        </form>;
    }
}

export default ForgetPassword;