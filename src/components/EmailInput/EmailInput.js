/**
 * @name EmailInput
 * @author Mark Heard
 * @version 1.0
 * @copyright 2022
 * @requires ReactJS - A library maintained by Facebook -- https://reactjs.org/
 * @component A component used to collect users email address
 * 
 * @param {object} props - Properties and methods that are inherited from the parent component
 * 
 *     This component is currently designed to accept (4) inputs:
 *         props.label - a label for the email input
 *         props.value - a value from the parent component/application state
 *         props.onChange - a method that updates the state everytime the input value changes
 * 
 * @property {string} props.label -  a text value to be rendered in a HTML label tag 
 *                                   EXAMPLE: <label> { props.label } </label> tag
 * 
 * @property {string} props.value -  Input value inherited from and propagated to a higher level component
 * 
 * @method props.onChange - State handler function inherited from a higher level component
 * 
 * @property { boolean } focus - records whether or not the input is in focus
 * @default true
 * @method setFocus - method used for handling changes to the focus state variable
 * 
 * @property { boolean } disabled - controls the underlying inputs disabled attributes
 * 
 * @returns { <EmailInput label={} value={} onChange={} /> }  - The JSX email input element to be rendered
 */

import React, { useState } from 'react';
import { useTheme } from '../../contexts/Theme';
import './EmailInput.css';

const EmailInput = props => {

    const [focus, setFocus] = useState(false);
    const {theme} = useTheme();

    const focusedClass = focus === true || props.value.length > 0 ? 'focused' : '';

    return (
        <div className={`${theme} email-input`}>

            <label className={focusedClass} >{props.label}</label>

            <input
                type='email'
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                disabled={props.disabled}
            />

        </div>
    );
};

export default EmailInput;