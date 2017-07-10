import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createCake} from '../actions';

class NewCake extends Component {
    
    renderField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`
        
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className='form-control'
                    type='text'
                    {...field.input}
                />
                <div className='text-help'>
                    {touched ? error : ''}
                </div>
            </div>
        );
    }
    
    onSubmit(values) {
        this.props.createCake(values, () => {
            this.props.history.push('/');
        });
    }    
    
    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    name='title'
                    component={this.renderField}
                    label='Title' 
                    />
                <Field 
                    name='desc' 
                    component={this.renderField}
                    label='Description' 
                    />
                <Field 
                    name='image' 
                    component={this.renderField}
                    label='Image URL' 
                    />
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='/' className='btn btn-danger'>Cancel</Link>                
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    
    if (!values.title || values.title.length < 3) {
        errors.title = 'Enter a title that is at least 3 chars!';
    }
    
    if (!values.desc) {
        errors.desc = 'Enter some decription!';
    }
    
    if (!values.image) {
        errors.image = 'Enter an image url!';
    }
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'NewCakeForm'
})(
    connect(null, {createCake})(NewCake)
);