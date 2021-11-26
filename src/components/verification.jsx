import React from "react";
import {Button, Grid} from "@mui/material";
import Form from "./common/form";
import Joi from "joi-browser";
import {emailVerification, resendVerificationCode} from "../services/userService";
import SimpleSnackbar from "./common/snackbar";

class Verification extends Form {

    state={
        inputs:[
            {name: 'code', type: 'text', value: '', label: "Email verification code", error: "", btnDisabled: true}
        ],
        snackMessage: null
    }

    schema={
        code: Joi.number().min(100000).max(999999).required().label('Email verification code')
    };

    doChange=async({name, value})=>{
        return null;
    }

    doSubmit=async(values)=>{
        try{
            const data = await emailVerification(values);
            const token = data.headers['x-auth-token'];
            localStorage.setItem('jwtToken', token);
            this.props.history.replace('/');
            return;
        }catch (ex) {
            this.props.setError({message: ex.response.data});
        }
        this.setState({btnDisabled: false});
    }

    getEmailVerificationCode = async()=>{
        try{
            const data = (await resendVerificationCode()).data;
            const snackMessage = data;
            this.setState({snackMessage});
        }catch (ex) {
            console.log(ex);
        }
    }

    closeSnackMessage=()=>{
        const snackMessage = null;
        this.setState({snackMessage});
    }

    render() {
        document.title = "Email verification";
        const {inputs, btnDisabled, snackMessage} = this.state;
        const button = <Grid container columnSpacing={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Button disabled={this.btnDisabled()||btnDisabled} type={'submit'} variant={'contained'} fullWidth style={{margin: '0 0 10px 0'}}>Submit</Button>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className={"center"}>Didn't receive email verification code? <div className={'custom-link'} onClick={()=>this.getEmailVerificationCode()}>Send Verification Code</div></div>
            </Grid>
            <SimpleSnackbar message={snackMessage} closeSnackMessage={this.closeSnackMessage}/>
        </Grid>;
        return <form  onSubmit={this.handleSubmit}>
            {this.renderInput(inputs, button)}
        </form>;
    }
}

export default Verification;