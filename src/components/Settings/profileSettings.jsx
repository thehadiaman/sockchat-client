import React from "react";
import {Button} from "@mui/material";
import Form from "../common/form";
import Joi from "joi-browser";

class ProfileSettings extends Form {

    state={
        inputs:[{name: 'name', type: 'text', value: this.props.user.name, label: "Name", error: "", btnDisabled: false, helper: "Change the current name"},
            {name: 'username', type: 'text', value: this.props.user.username, label: "Username", error: "", btnDisabled: false, helper: "Change the current username"}],
        snackMessage: null
    }

    schema={
        name: Joi.string().min(3).max(50).required().label('Full Name'),
        username: Joi.string().min(3).max(50).required().label('Username')
    };

    doChange=()=>{
        return null;
    }

    doSubmit=async(values)=>{
        try{
            this.setState({btnDisabled: false});
            return null;
        }catch (ex) {
            this.setState({snackMessage: ex.response.data});
        }
        this.setState({btnDisabled: false});
    }

    render() {
        document.title = "Login";
        const {inputs, btnDisabled} = this.state;
        const button = <Button type={'submit'} disabled={this.btnDisabled()||btnDisabled} variant={'contained'} fullWidth style={{margin: '0 0 10px 0'}}>Submit</Button>;
        return <form onSubmit={this.handleSubmit}>
            <br/>
            <h1>Edit Profile</h1>
            {this.renderInput(inputs, button)}
            <br/>
            <br/>
        </form>;
    }
}

export default ProfileSettings;