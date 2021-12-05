import React from "react";
import {LoadingButton} from "@mui/lab";
import Form from "../common/form";
import Joi from "joi-browser";
import Progress from "../common/CircularProgress/progress";

class ProfileSettings extends Form {

    state={
        inputs:[{name: 'currentPassword', type: 'password', value: '', label: "Current Password", error: "", btnDisabled: true, helper: "Current password"},
            {name: 'password', type: 'password', value: '', label: "New Password", error: "", btnDisabled: true, helper: "New Password"},
            {name: 'conformPassword', type: 'password', value: '', label: "Conform Password", error: "", btnDisabled: true, helper: "Conform your new password"}],
        snackMessage: null,
        loadingBtn: false
    }

    schema={
        currentPassword: Joi.string().min(6).max(50).required().label('Password'),
        password: Joi.string().min(6).max(50).required().label('Password'),
        conformPassword: Joi.string().min(6).max(50).required().label('Password'),
    };

    doChange=async({name, value})=>{
        return null;
    }

    doSubmit=async(values)=>{
        this.setState({btnDisabled:false, loadingBtn: true});
        try{
            setTimeout(()=>this.setState({btnDisabled: true, loadingBtn: false}), 3000);
            return null;
        }catch (ex) {
            this.setState({snackMessage: ex.response.data});
        }
        this.setState({loadingbtn: false, btnDisabled: false});
    }

    render() {
        document.title = "Change Password";
        const {inputs, btnDisabled, loadingBtn} = this.state;
        const button = <LoadingButton loadingIndicator={<Progress/>} loading={loadingBtn} type={'submit'} disabled={this.btnDisabled()||btnDisabled} variant={'contained'} fullWidth style={{margin: '0 0 10px 0'}}>Save</LoadingButton>;
        return <form onSubmit={this.handleSubmit}>
            <br/>
            <h1>Change Password</h1>
            {this.renderInput(inputs, button)}
            <br/>
            <br/>
        </form>;
    }
}

export default ProfileSettings;