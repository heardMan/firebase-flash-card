/**
 * @name PasswordReset
 * @author Mark Heard
 * @version 1.0
 * @copyright 2022
 * @requires ReactJS - A library maintained by Facebook -- https://reactjs.org/
 * @requires React-Router-Dom - a library to help mimic traditional page routing of a web application
 * @component A component used to collect Reset a user's password for a Google Firebase Application
 * 
 * @property {string} email - records the user's email
 * @default '' - empty string
 * @method setEmail - method used for handling changes to the email state variable
 * 
 * @property {string} emailValid1 - records whether or not the email state variable value is valid
 * @default '' - empty string
 * @method setEmailValid1 - method used for handling changes to the emailValid1 state variable
 * 
 * @property {string} allowSubmit - 
 * @default '' - empty string
 * @method setAllowSubmit - method used for handling changes to the allowSubmit state variable
 * 
 * @method validateEmail - contains logic for the 1st validation case for the email state variable
 * 
 * @returns { <PasswordReset /> }  - The JSX SignIn element to be rendered
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth.js';
import EmailInput from '../EmailInput/EmailInput';

import './PasswordReset.css';

const PasswordReset = () => {

    const [email, setEmail] = useState('');
    const [emailValid1, setEmailValid1] = useState('');

    const [allowSubmit, setAllowSubmit] = useState(false);

    const { resetUserPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async e => {

        e.preventDefault();

        if (allowSubmit === true) {

            console.log('resetting')
            try {
                await resetUserPassword(email).then(res=>{
                    console.log('success');
                    navigate('/signin');

                }).catch(e=>{
                    console.log(JSON.stringify(e));
                });
                

            }
            catch (e) {
                console.log(e.message)
            }
        }

    }

    useEffect(() => {

        const validateEmail = () =>
            email.length > 0 && email.length < 6
                ?
                setEmailValid1('please provide a valid email')
                :
                setEmailValid1('');

        validateEmail();


        if (
            emailValid1 === '' && email.length > 0
        ) {
            return setAllowSubmit(true);
        }

        return setAllowSubmit(false);

    },
        //useEffect Dependency Array
        [
            emailValid1, email.length
        ]
    );

    return (
        <form id='password-reset'>

            <div className='form-group'>
                <h2>Send Password Reset Email</h2>
            </div>

            <div className='form-group'>
                <EmailInput label={'email'} value={email} onChange={setEmail} disabled={false} />
                <p className='validate-text'> {emailValid1} </p>
            </div>

            <div className='form-group'>
                <button className={`form-submit ${allowSubmit === true ? 'active' : ''}`} onClick={handleSubmit}>Send Password Reset</button>
            </div>

            <div className='form-group'>
                <p>Don't have an account? </p>
                <Link className='signup' to='/signup'>Sign Up Here</Link>
            </div>

            <div className='form-group'>
                <p> Remeber your password? </p>
                <Link className='signup' to='/signin'>Sign In Here</Link>
            </div>

        </form>
    );
};

export default PasswordReset;