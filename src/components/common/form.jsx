import React, {Component} from "react";
import {Divider, TextField} from "@mui/material";
import Joi from "joi-browser";

class Form extends Component {

    state={
        errors: {}
    }

    handleChange=({target})=>{
        const {inputs} = this.state;
        const input = inputs.find(input=>input.name===target.name);
        const indexOfInput = inputs.indexOf(input);
        input.value = target.value;
        inputs[indexOfInput] = input;
        this.setState({inputs});
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
        console.log(data);
        return Joi.validate(data, this.schema, {abortEarly: false});
    }

    handleSubmit=(e)=>{
        e.preventDefault();

        const inputs = this.state.inputs;
        const keys = this.getKeys();

        const data = this.getData(inputs, keys);
        const schema = this.schema;
        const {error} = this.validate(data, schema);
        if(error){
            for(let item of error.details){
                console.log(item);
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
                    onChange={this.handleChange}
                    style={{marginBottom: '10px'}}
                    label={input.label}
                    fullWidth
                />
            })}
            {button}
            <Divider/>
        </div>
    }
}

export default Form;