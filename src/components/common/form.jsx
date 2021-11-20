import React, {Component} from "react";
import {TextField, InputAdornment, Tooltip} from "@mui/material";
import Joi from "joi-browser";
import {renderNoneIcon, renderOkIcon} from "../common/svgImages";

class Form extends Component {

    state={}

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
        e.preventDefault();

        const inputs = this.state.inputs;
        const keys = Object.keys(this.schema);

        const data = this.getData(inputs, keys);
        const schema = this.schema;
        const {error} = this.validate(data, schema);
        if(error){
            for(let item of error.details){
                console.log(item.message);
            }
        }
        if(!error){
            console.log("Submitting...");
        }
    }

    renderInput=(inputs, button)=>{
        return <div>
            {inputs.map(input=>{
                return<TextField
                    key={input.name}
                    name={input.name}
                    value={input.value}
                    type={input.type}
                    InputProps={['id', 'email', 'username'].includes(input.name)?{
                        endAdornment: (
                            <Tooltip title={input.error} arrow={true} open={input.error?true:false}>
                                <InputAdornment position="end">
                                    {(input.error?true:false)&&renderNoneIcon()}
                                    {(input.error===""&&!input.btnDisabled)&&renderOkIcon()}
                                </InputAdornment>
                            </Tooltip>
                        ),
                    }:null}
                    error={input.error?true:false}
                    onChange={this.handleChange}
                    style={{marginBottom: '10px'}}
                    label={input.label}
                    fullWidth
                />
            })}
            {button}
        </div>
    }
}

export default Form;