import React from "react";
import {Button} from "@mui/material";
import Form from "./common/form";
import Joi from "joi-browser";

class ForgetPassword extends Form {

    state={
        inputs:[
            {name: 'email', type: 'email', value: '', label: "Email address or username"}
        ],
        errors: {}
    }

    getKeys=()=>{
        return ['email'];
    }

    schema={
        password: Joi.string().min(6).max(50).required().label('Password')
    };

    render() {
        const {inputs} = this.state;
        const button = <Button type={'submit'} variant={'contained'} fullWidth style={{margin: '0 0 10px 0'}}>Send Login Link</Button>;
        return <form  onSubmit={this.handleSubmit}>
            {this.renderInput(inputs, button)}
        </form>;
    }
}

export default ForgetPassword;