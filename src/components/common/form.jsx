import React, {Component} from "react";
import {TextField, InputAdornment, Tooltip, FormControl, FormHelperText} from "@mui/material";
import Joi from "joi-browser";
import {renderNoneIcon, renderOkIcon} from "../common/svgImages";
import SimpleSnackbar from "./snackbar";

class Form extends Component {

    state={
        btnDisabled: false,
        snackMessage: null
    }

    btnDisabled=()=>{
        const keys = Object.keys(this.schema);
        let disabled = false;
        for(let item of keys){
            const btnStatus = this.state.inputs.find(input=>input.name===item).btnDisabled;
            if(btnStatus) disabled = true;
        }
        return disabled;
    }

    validateInput=({name, value: data})=>{
        const schema = {[name]: this.schema[name]};
        const value = {[name]: data};
        return Joi.validate(value, schema);
    }

    filterText=(text)=>{
        const list = ["`", "~", "!", "#", "$", "%", "^", "&", "*", "(", ")", "", "+", "=", "{", "[", "]", "}", ":", ";", "\"",
            "'", "|", "\\", "<", ",", ">", "", "?", "/"];
        for(let item of list){
            text = text.replace(item, '');
            text = text.replace(' ', '_');
        }
        return text;
    }

    handleChange=({target})=>{
        this.setState({snackMessage: null});
        const {inputs} = this.state;
        const input = inputs.find(input=>input.name===target.name);
        const indexOfInput = inputs.indexOf(input);
        if(['email', 'id', 'username'].indexOf(target.name)!==-1) {
            target.value = this.filterText(target.value);
        }
        input.value = target.value;
        inputs[indexOfInput] = input;
        this.setState({inputs});
        const {error} = this.validateInput(target);
        if(error){
            input.error = error.details[0].message;
            input.btnDisabled = true;
        }else{
            input.error = "";
            input.btnDisabled = false;
        }
        this.setState({inputs});
        if(!error){
            this.doChange(target);
        }
    }

    getData=(inputs, keys)=>{
        const data = {};
        for(let item of keys){
            const input = inputs.find(input=>input.name===item);
            data[item] = input.value;
        }
        return data;
    }

    validate=(data, schema)=>{
        return Joi.validate(data, this.schema, {abortEarly: false});
    }

    handleSubmit=(e)=>{
        this.setState({btnDisabled: true});
        e.preventDefault();

        const inputs = this.state.inputs;
        const keys = Object.keys(this.schema);

        const data = this.getData(inputs, keys);
        const schema = this.schema;
        const {error} = this.validate(data, schema);
        if(error){
            for(let item of error.details){
                this.setState({snackMessage: item.message});
            }
            return;
        }
        if(!error){
            this.doSubmit(data)
        }
    }

    closeSnackMessage=()=>{
        const snackMessage = null;
        this.setState({snackMessage});
    }

    renderInput=(inputs, button)=>{
        return <div>
            {inputs.map(input=>{return <FormControl key={input.name} variant={"standard"} fullWidth>
                    <TextField
                        name={input.name}
                        value={input.value}
                        type={input.type}
                        multiline={input.type==='multiline'}
                        required={!input.required_false?true:false}
                        rows={5}
                        InputProps={{
                            endAdornment: (
                                <Tooltip title={input.error} arrow={true} open={input.error?true:false}>
                                    <InputAdornment position="end">
                                        {(input.error?true:false)&&renderNoneIcon()}
                                        {(input.error===""&&!input.btnDisabled)&&renderOkIcon()}
                                    </InputAdornment>
                                </Tooltip>
                            ),
                        }}
                        error={input.error?true:false}
                        onChange={this.handleChange}
                        style={{marginBottom: input.helper?'0':'10px'}}
                        label={input.label}
                        fullWidth
                    />
                    {
                        input.helper&&(
                            <FormHelperText style={{marginBottom: '15px'}}>
                                {input.helper}
                            </FormHelperText>
                        )
                    }
                </FormControl>
            })}
            {button}
            <SimpleSnackbar message={this.state.snackMessage} closeSnackMessage={this.closeSnackMessage}/>
        </div>
    }
}

export default Form;