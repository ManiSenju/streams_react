import React from 'react';
import {Field, reduxForm} from 'redux-form';


class StreamForm extends React.Component{

    renderInput=({input,label,meta})=>{
        const className = `field ${meta.touched && meta.error ? 'error':''}`;
        return (
        <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete="off" />
            {this.renderErrorMsg(meta)}
        </div>
       )
    }
    renderErrorMsg({error,touched}){
        if(touched && error){
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    onSubmit=(formValues)=>{
        this.props.onSubmit(formValues);
    }
    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title"  component={this.renderInput} label="Enter Text" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
            <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validateErrors=(formValues)=>{
    const errors={};
    if(!formValues.title)
        errors.title = 'Enter title';
    if(!formValues.description)
        errors.description = 'Enter Description';
    return errors;
}
export default reduxForm({form:'streamform',validate: validateErrors})(StreamForm);