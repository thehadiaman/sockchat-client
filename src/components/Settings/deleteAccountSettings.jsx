import React from "react";
import {LoadingButton} from "@mui/lab";
import Form from "../common/form";
import Joi from "joi-browser";
import Progress from "../common/CircularProgress/progress";

class PasswordSettings extends Form {

    state={
        inputs:[{name: 'password', type: 'password', value: '', label: "Password", error: "", btnDisabled: true, helper: "Enter your password and conform your identity"}],
        snackMessage: null,
        loadingBtn: false
    }

    schema={
        password: Joi.string().min(6).max(50).required().label('Password')
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
        document.title = "Delete Account";
        const {inputs, btnDisabled, loadingBtn} = this.state;
        const button = <LoadingButton loadingIndicator={<Progress/>} loading={loadingBtn} type={'submit'} disabled={this.btnDisabled()||btnDisabled} variant={'contained'} color={'error'} fullWidth style={{margin: '0 0 10px 0'}}>Delete Account</LoadingButton>;
        return <form onSubmit={this.handleSubmit}>
            <br/>
            <h1>Delete Account</h1>
            {this.renderInput(inputs, button)}
            <br/>
            <br/>
            <p>This action will permanently delete your account.</p>
        </form>;
    }
}

export default PasswordSettings;