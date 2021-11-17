import React from "react";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
import ForgetPassword from "./forgetPassword";

const forgetPasswordLink = <Link to={'/forgetPassword'} className={'link'}>Forget your password?</Link>;
const signUpLink = <div>Don't you have an account? <Link to={'/signup'} className={'link'}> Sign up</Link></div>;
const loginLink = <div>Already have an account? <Link to={'/'} className={'link'}> Login</Link></div>;
const signupText = <div>You are creating a new account, wait for verification link after signup.</div>;
const newAccount = <Link to={'/signup'} className={'link'}>Create a new account</Link>;
const backToLogin = <Link to={'/'} className={'link'}>Back to login</Link>

export default function Welcome({match}){
    return<Grid container columnSpacing={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Grid item lg={4} md={4} sm={3}/>
        <Grid item lg={4} md={4} sm={6} sx={{margin: {lg: "60px 0 50px 0", md: "60px 0 50px 0", sm: "60px 0 50px 0", xs: "0 0 0 0"}}} >
            <Card>
                <CardContent>
                    <Typography align={"center"} variant="h3" component="div" style={{margin: "20px 0 20px 0"}}>
                        SockChat
                    </Typography>
                    {
                        (match.path==='/signup'&&<SignUp/>)||
                        (match.path==='/forgetPassword'&&<ForgetPassword/>)||
                        (match.path==='/'&&<Login/>)
                    }
                </CardContent>

                <CardContent style={{textAlign: "center"}}>
                    {
                        (match.path==='/signup'&&signupText)||
                        (match.path==='/forgetPassword'&&newAccount)||
                        (match.path==='/'&&forgetPasswordLink)
                    }
                </CardContent>
            </Card>

            <Card style={{margin: '15px 0 0 0', textAlign: "center"}}>
                <CardContent>
                    {
                        (match.path==='/signup'&&loginLink)||
                        (match.path==='/forgetPassword'&&backToLogin)||
                        (match.path==='/'&&signUpLink)
                    }
                </CardContent>
            </Card>
        </Grid>
    </Grid>
}