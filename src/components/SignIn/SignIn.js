/**
 * @name SignIn
 * @author Mark Heard
 * @version 1.0
 * @copyright 2022
 * @requires ReactJS - A library maintained by Facebook -- https://reactjs.org/
 * @requires React-Router-Dom - a library to help mimic traditional page routing of a web application
 * @component A component used to collect User Sign Up Data for a Google Firebase Application
 * 
 * @property {string} email - records the user's email
 * @default '' - empty string
 * @method setEmail - method used for handling changes to the email state variable
 * 
 * @property {string} emailValid1 - records whether or not the email state variable value is valid
 * @default '' - empty string
 * @method setEmailValid1 - method used for handling changes to the emailValid1 state variable
 * 
 * @property {string} password - records the user's password
 * @default '' - empty string
 * @method setPassword - method used for handling changes to the password state variable
 * 
 * @property {string} passwordValid1 - records whether or not the password state variable value is valid
 * @default '' - empty string
 * @method setPasswordValid1 - method used for handling changes to the passwordValid1 state variable
 * 
 * @property {string} password2 - validates the user's desired password
 * @default '' - empty string
 * @method setPassword2 - method used for handling changes to the password2 state variable
 * 
 * @property {string} allowSubmit - 
 * @default '' - empty string
 * @method setAllowSubmit - method used for handling changes to the allowSubmit state variable
 * 
 * @method validateEmail - contains logic for the 1st validation case for the email state variable
 * 
 * @method validatePassword - contains logic for the 1st validation case for the password state variable
 * 
 * @returns { <SignIn /> }  - The JSX SignIn element to be rendered
 */

import { set } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth.js';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import './SignIn.css';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [emailValid1, setEmailValid1] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState('');
    const [wrongPassword, setWrongPassword] = useState('');

    const [allowSubmit, setAllowSubmit] = useState(false);

    //const [loading, setLoading] = useState(false)

    const { logIn, authUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async e => {

        e.preventDefault();

        if (allowSubmit === true) {

            console.log('logging')
            try {
                await logIn(email, password).then(()=>{
                    setWrongPassword('')
                    setInvalidEmail('')
                });
            }
            catch (e) {
                console.log(e);

                if(e.message==='Firebase: Error (auth/wrong-password).'){
                    setWrongPassword('Incorrect password provided.')
                }

                if(e.message==='Firebase: Error (auth/invalid-email).'){
                    setInvalidEmail('Sorry, we couldn\'t find a user with that email addres.s' )
                }
                
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

        const validatePassword = () =>
            password.length > 0 && password.length < 6
                ?
                setPasswordValid('password must be at least 6 character long')
                :
                setPasswordValid('');

        validateEmail();
        validatePassword();

        if(authUser.auth!==null){
            return navigate('/');
        }

        if (
            emailValid1 === '' && email.length > 0 &&
            passwordValid === '' && password.length > 0
        ) {
            return setAllowSubmit(true);
        }

        return setAllowSubmit(false);

    },
        //useEffect Dependency Array
        [
            emailValid1, email.length,
            passwordValid, password,
            navigate,authUser
        ]
    );

    return (
        <form id='sign-in'>

            <div className='form-group'>
                <h2>Sign In</h2>
            </div>

            <div className='form-group'>
                <EmailInput label={'email'} value={email} onChange={email=>{
                    setEmail(email)
                    setInvalidEmail('')
                    }} disabled={false} />
                <div className='validate-text-container'>
                {emailValid1===''?'':<div className='validate-text'> {emailValid1} </div>}
                {invalidEmail===''?'':<div className='validate-text'> {invalidEmail} </div>}
                </div>
            </div>

            <div className='form-group'>
                <PasswordInput label={'password'} value={password} onChange={password=>{
                    setPassword(password)
                    setWrongPassword('')
                }} disabled={false} />
                <div className='validate-text-container'>
                {passwordValid===''?'':<p className='validate-text'> {passwordValid} </p>}
                {wrongPassword===''?'':<p className='validate-text'> {wrongPassword} </p>}
                </div>
            </div>

            <div className='form-group'>
                <button className={`form-submit ${allowSubmit === true ? 'active' : ''}`} onClick={handleSubmit}>Sign In</button>
            </div>

            <div className='form-group'>
                <p>Don't have an account? <Link className='signup' to='/signup'>Sign Up Here</Link></p>
                {/* @TODO: Implement Password Reset  */}
                <p><Link className='signup' to='/reset' onClick={e=>{console.log(e)}}>Forgot Your Password?</Link></p>
            </div>

        </form>
    );
};

export default SignIn;