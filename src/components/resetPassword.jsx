import React from "react";
import {Card, Button, CardContent, Grid, Typography, Divider} from "@mui/material";
import logo from "./images/logo.png";
import Form from "./common/form";
import Joi from "joi-browser";
import {validatePasswordResetLink, resetPassword} from "../services/userService";

class ResetPassword extends Form {

    state={
        inputs:[{name: 'password', type: 'password', value: '', label: "Password", error: "", btnDisabled: true},
            {name: 'confirmPassword', type: 'password', value: '', label: "Confirm Password", error: "", btnDisabled: true}],
    }

    componentWillMount() {
        this.validatePasswordResetLink();
    }

    schema={
        password: Joi.string().min(6).max(50).required().label('Password'),
        confirmPassword: Joi.string().min(6).max(50).required().label('Confirm Password')
    };

    doChange=()=>{
        return null;
    }

    validatePasswordResetLink=async()=>{
        const token = this.props.history.location.search.split('=')[1];
        try {
            const validLink = (await validatePasswordResetLink(token)).data;
            if(!validLink)
                this.props.history.replace('/');

        }catch (ex) {
            console.log(ex.response.data);
            this.props.history.replace('/');
        }
    }

    doSubmit=async(values)=>{
        try{
            const token = this.props.history.location.search.split('=')[1];
            const data = (await resetPassword(values, token)).data;
            console.log(data);
            this.props.history.replace('/');
        }catch (ex) {
            this.setState({snackMessage: ex.response.data});
        }
        this.setState({btnDisabled: false});
    }

    render() {
        document.title = "Reset Password";
        const {inputs, btnDisabled} = this.state;
        const button = <Button type={'submit'} disabled={this.btnDisabled()||btnDisabled} variant={'contained'} fullWidth style={{margin: '0 0 10px 0'}}>Submit</Button>;

        return<Grid container columnSpacing={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Grid item lg={4} md={4} sm={3}/>
            <Grid item lg={4} md={4} sm={6} sx={{margin: {lg: "60px 0 50px 0", md: "60px 0 50px 0", sm: "60px 0 50px 0", xs: "0 0 0 0"}}} >
                <Card>
                    <CardContent>
                        <Typography align={"center"} variant="h3" component="div" style={{margin: "20px 0 20px 0"}}>
                            <img src={logo} alt={"logo.svg"} width={"80%"} height={"60px"}/>
                        </Typography>
                        <form onSubmit={this.handleSubmit}>
                            {this.renderInput(inputs, button)}
                        </form>
                    </CardContent>
                    <Divider/>
                    <CardContent>
                        This page is available only when the password reset token is valid
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    }
}

export default ResetPassword;