import React, {Component} from "react";
import {TextField} from "@mui/material";
import Joi from "joi-browser";

class Form extends Component {

    state={}

    validateInput=({name, value: data})=>{
        const schema = {[name]: this.schema[name]};
        const value = {[name]: data};
        return Joi.validate(value, schema);
    }

    handleChange=({target})=>{
        const {inputs} = this.state;
        const input = inputs.find(input=>input.name===target.name);
        const indexOfInput = inputs.indexOf(input);
        if(['email', 'id', 'username'].indexOf(target.name)!==-1) {
            target.value = target.value.replace(' ', '_')
        }
        input.value = target.value;
        inputs[indexOfInput] = input;
        this.setState({inputs});
        const {error} = this.validateInput(target);
        let errors = {};
        if(error){
            errors = {
                [target.name]: error.details[0].message
            }
            this.setState({btnDisabled: true});
        }else{
            if(errors[target.name]) delete errors[target.name];
            this.setState({btnDisabled: false});
        }
        if(this.props.setErrors)
            this.props.setErrors(errors);
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
                const error = this.props.errors[input.name]?true:false;
                return<TextField
                    key={input.name}
                    name={input.name}
                    value={input.value}
                    type={input.type}
                    error={error}
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