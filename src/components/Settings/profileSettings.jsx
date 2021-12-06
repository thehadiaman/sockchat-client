import React from "react";
import {LoadingButton} from "@mui/lab";
import Form from "../common/form";
import Joi from "joi-browser";
import Progress from "../common/CircularProgress/progress";
import {checkId} from "../../services/userService";
import {updateUser} from "../../services/userService";

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

    doChange=async({name, value})=>{
        this.setState({loadingBtn: false, btnDisabled: false});
        if(['username'].includes(name)){
            const inputs = this.state.inputs;
            const data = (await checkId(value)).data;
            if(data){
                const input = inputs.find(input=>input.name===name);
                input.btnDisabled = true;
                input.error = `${name} already used.`
                this.setState({inputs});
            }
        }
    }

    doSubmit=async(values)=>{
        this.setState({btnDisabled:false, loadingBtn: true});
        try{
            await updateUser(values);
            await this.props.setUser();
            this.setState({btnDisabled: true, loadingBtn: false})
            return null;
        }catch (ex) {
            this.setState({snackMessage: ex.response.data});
        }
        this.setState({loadingBtn: false, btnDisabled: false});
    }

    render() {
        document.title = "Edit Profile";
        const {inputs, btnDisabled, loadingBtn} = this.state;
        const profileSaveButton = <LoadingButton loadingIndicator={<Progress/>} loading={loadingBtn} type={'submit'} disabled={this.btnDisabled()||btnDisabled} variant={'contained'} fullWidth style={{margin: '0 0 10px 0'}}>Save</LoadingButton>;
        return <form onSubmit={this.handleSubmit}>
            <br/>
            <h1>Edit Profile</h1>
            {this.renderInput(inputs, profileSaveButton)}
            <br/>
            <br/>
        </form>;
    }
}

export default ProfileSettings;