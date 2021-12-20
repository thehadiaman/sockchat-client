import React from "react";
import {LoadingButton} from "@mui/lab";
import {Button} from "@mui/material";
import Form from "../common/form";
import Joi from "joi-browser";
import Progress from "../common/CircularProgress/progress";
import {scheduleAccountDelete, cancelAccountDelete} from "../../services/userService";

class PasswordSettings extends Form {

    state={
        inputs:[{name: 'password', type: 'password', value: '', label: "Password", error: "", btnDisabled: true, helper: "Enter your password to conform your identity"}],
        snackMessage: null,
        loadingBtn: false
    }

    schema={
        password: Joi.string().min(6).max(50).required().label('Password')
    };

    doChange=async({name, value})=>{
        return null;
    }

    clearInput=()=>{
        const inputs = [...this.state.inputs];
        for(let a=0;a<inputs.length;a++){
            inputs[a].value = '';
            inputs[a].btnDisabled = true;
        }
        this.setState({inputs, btnDisabled: false});
    }

    doSubmit=async(values)=>{
        this.setState({btnDisabled:false, loadingBtn: true});
        try{
            const data = (await scheduleAccountDelete(values)).data;
            this.setState({btnDisabled: true, loadingBtn: false, snackMessage: data});
            await this.props.setUser();
            this.clearInput();
            return null;
        }catch (ex) {
            this.setState({snackMessage: ex.response.data});
        }
        this.setState({loadingBtn: false, btnDisabled: false});
    }

    handleCancelAccountDelete=async()=>{
        const data = (await cancelAccountDelete()).data;
        await this.props.setUser();
        this.setState({snackMessage: data});
    }

    render() {
        document.title = "Delete Account";

        if(this.props.user.verification.expire){
            return <div>
                <h1>Delete Account</h1>
                <p>Account Scheduled to delete.</p>
                <Button variant={"contained"} color={'error'} onClick={this.handleCancelAccountDelete}>Cancel deletion
                </Button>
                <br/>
                <br/>
                <p>This action will cancel the request to delete your account.</p>
            </div>
        }


        const {inputs, btnDisabled, loadingBtn} = this.state;
        const button = <LoadingButton loadingIndicator={<Progress/>} loading={loadingBtn} type={'submit'} disabled={this.btnDisabled()||btnDisabled} variant={'contained'} color={'error'} fullWidth style={{margin: '0 0 10px 0'}}>Delete Account</LoadingButton>;
        return <form onSubmit={this.handleSubmit}>
            <br/>
            <h1>Delete Account</h1>
            {this.renderInput(inputs, button)}
            <br/>
            <br/>
            <p>This action will schedule your account to delete after 24 hours.</p>
        </form>;
    }
}

export default PasswordSettings;