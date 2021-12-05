import React from "react";
import {LoadingButton} from "@mui/lab";
import Form from "../common/form";
import Joi from "joi-browser";
import Progress from "../common/CircularProgress/progress";

class ProfileSettings extends Form {

    state={
        inputs:[{name: 'name', type: 'text', value: this.props.user.name, label: "Name", error: "", btnDisabled: false, helper: "Change the current name."},
            {name: 'username', type: 'text', value: this.props.user.username, label: "Username", error: "", btnDisabled: false, helper: "Change the current username."},
            {name: 'bio', type: 'multiline', value: this.props.user.bio, label: "Bio", error: "", btnDisabled: false, helper: this.props.user.bio?"Change your bio.":"Add your bio.", required_false: true}],
        snackMessage: null,
        loadingBtn: false
    }

    schema={
        name: Joi.string().min(3).max(50).required().label('Full Name'),
        username: Joi.string().min(3).max(50).required().label('Username'),
        bio: Joi.string().min(0).max(250).allow("").label('Bio')
    };

    doChange=()=>{
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
        this.setState({loadingbtn: false});
        this.setState({btnDisabled: false});
    }

    render() {
        document.title = "Edit Profile";
        const {inputs, btnDisabled, loadingBtn} = this.state;
        const button = <LoadingButton loadingIndicator={<Progress/>} loading={loadingBtn} type={'submit'} disabled={this.btnDisabled()||btnDisabled} variant={'contained'} fullWidth style={{margin: '0 0 10px 0'}}>Submit</LoadingButton>;
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