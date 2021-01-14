import React from 'react';
import classes from './Input.module.css'

const input = (props)=> {

    let inputElement = null;
    let inputClasses = [classes.InputElement];
        
    if(props.shouldValidate && props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    console.log(inputClasses.join(' '));

    switch(props.elementType) {
        case('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}  onChange={props.changed} />;
            break;
        case('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}  onChange={props.changed} />;
            break;
        case('select'):
            inputElement = 
                (
                    <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed} >
                        {props.elementConfig.options.map(option => (
                            <option key={option.key} value={option.value}>{option.displayValue}</option>
                        ))}
                    </select>
                );
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}   onChange={props.changed} />;
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;