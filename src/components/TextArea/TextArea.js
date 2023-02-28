/**
 * @name TextArea
 * @author Mark Heard
 * @version 1.0
 * @copyright 2022
 * @requires ReactJS - A library maintained by Facebook -- https://reactjs.org/
 * @component A component used to collect text data from users
 * 
 * @param {object} props - Properties and methods that are inherited from the parent component
 * 
 *     This component is currently designed to accept (3) inputs:
 *         props.label - a label for the text input
 *         props.value - a value from the parent component/application state
 *         props.onChange - a method that updates the state everytime the input value changes
 * 
 * @param {string} props.label -  a text value to be rendered in a HTML label tag 
 *                                EXAMPLE: <label> { props.label } </label> tag
 * 
 * @param {string} props.value -  Input value inherited from and propagated to a higher level component
 * 
 * @param @method props.onChange - State handler function inherited from a higher level component
 * 
 * @property { boolean } focus - records whether or not the input is in focus
 * @default true
 * @method setFocus - method used for handling changes to the focus state variable
 * 
 * @property { boolean } disabled - controls the underlying inputs disabled attributes
 * 
 * @returns { <TextArea label={} value={} onChange={} /> }  - The JSX text input element to be rendered
 */

import React, { useState } from 'react';
import './TextArea.css';

const TextArea = props => {

    const [focus, setFocus] = useState(false);

    const focusedClass = focus === true || props.value.length > 0 ? 'focused' : '';

    return (
        <div className='text-area'>

            <label className={focusedClass} >{props.label}</label>

            <textarea
                value={props.value}
                onChange={e=>props.onChange(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                disabled={props.disabled}
                rows={10}
            ></textarea>

        </div>
    );
};

export default TextArea;