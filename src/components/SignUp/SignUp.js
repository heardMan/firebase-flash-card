/**
 * @name SignUp
 * @author Mark Heard
 * @version 1.0
 * @copyright 2022
 * @requires ReactJS - A library maintained by Facebook -- https://reactjs.org/
 * @requires React-Router-Dom - a library to help mimic traditional page routing of a web application
 * @component A component used to collect User Sign Up Data for a Google Firebase Application
 * 
 * @property {string} firstName - records the user's first name
 * @default '' - empty string
 * @method setFirstName - method used for handling changes to the firstName state variable
 * 
 * @property {string} firstNameValid1 - records whether or not the firstName state variable value is valid
 * @default '' - empty string
 * @method setFirstNameValid1 - method used for handling changes to the firstNameValid1 state variable
 * 
 * @property {string} lastName - records the user's last name
 * @default '' - empty string
 * @method setLastName - method used for handling changes to the lastName state variable
 * 
 * @property {string} lastNameValid1 - records whether or not the lastName state variable value is valid
 * @default '' - empty string
 * @method setLastNameValid1 - method used for handling changes to the lastNameValid1 state variable
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
 * @property {string} passwordValid2 - records whether or not the password2 state variable value is valid
 * @default '' - empty string
 * @method setPasswordValid2 - method used for handling changes to the passwordValid2 state variable
 * 
 * @property {string} allowSubmit - 
 * @default '' - empty string
 * @method setAllowSubmit - method used for handling changes to the allowSubmit state variable
 * 
 * @method validateFirstName - contains logic for the 1st validation case for the firstName state variable
 * 
 * @method validateLastName - contains logic for the 1st validation case for the lastName state variable
 * 
 * @method validateEmail - contains logic for the 1st validation case for the email state variable
 * 
 * @method validatePassword1 - contains logic for the 1st validation case for the password state variable
 * 
 * @method validatePassword2 - contains logic for the 1st validation case for the password2 state variable
 * 
 * @returns { <SignUp /> }  - The JSX SignUp element to be rendered
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';



import { useAuth } from '../../contexts/Auth.js';
import User from '../../controllers/User.js'
import TextInput from '../TextInput/TextInput';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';

import { useTheme } from '../../contexts/Theme.js';


import './SignUp.css';

const SignUp = () => {

    const [firstName, setFirstName] = useState('');
    const [firstNameValid1, setFirstNameValid1] = useState('');

    const [lastName, setLastName] = useState('');
    const [lastNameValid1, setLastNameValid1] = useState('');

    const [email, setEmail] = useState('');
    const [emailValid1, setEmailValid1] = useState('');

    const [password, setPassword] = useState('');
    const [passwordValid1, setPasswordValid1] = useState('');

    const [password2, setPassword2] = useState('');
    const [passwordValid2, setPasswordValid2] = useState('');

    const [allowSubmit, setAllowSubmit] = useState(false);



    //const { createUserProfile } = User();
    const { createAuthUser } = useAuth();

    const navigate = useNavigate();
    const {theme} = useTheme();

    const handleSubmit = async e => {

        e.preventDefault();

        if (allowSubmit === true) {

            try {
                const newUser = await createAuthUser(email, password);
                await User.createUserProfile(newUser.user.uid, email, firstName, lastName );
                navigate('/signin');
            }
            catch (e) {
                console.log(e.message)
            }

        }

    }

    useEffect(() => {

        const validateFirstName = () =>
            firstName.length > 0 && firstName.length < 2
                ?
                setFirstNameValid1('please provide your first name')
                :
                setFirstNameValid1('');


        const validateLastName = () =>
            lastName.length > 0 && lastName.length < 2
                ?
                setLastNameValid1('please provide your last name')
                :
                setLastNameValid1('');


        const validateEmail = () =>
            email.length > 0 && email.length < 6
                ?
                setEmailValid1('please provide a valid email')
                :
                setEmailValid1('');


        const validatePassword1 = () =>
            password.length > 0 && password.length < 6
                ?
                setPasswordValid1('password must be at least 6 character long')
                :
                setPasswordValid1('');


        const validatePassword2 = () =>
            password2 !== password
                ?
                setPasswordValid2('passwords do not match')
                :
                setPasswordValid2('');


        validateLastName();
        validateFirstName();
        validateEmail();
        validatePassword1();
        validatePassword2();

        if (
            firstNameValid1 === '' && firstName.length > 0 &&
            lastNameValid1 === '' && lastName.length > 0 &&
            emailValid1 === '' && email.length > 0 &&
            passwordValid1 === '' && password.length > 0 &&
            passwordValid2 === '' && password2.length > 0
        ) {
            return setAllowSubmit(true);
        }

        return setAllowSubmit(false);

    },
        //useEffect Dependency Array
        [
            firstNameValid1, firstName.length,
            lastNameValid1, lastName.length,
            emailValid1, email.length,
            passwordValid1, password,
            passwordValid2, password2
        ]
    );

    return (
        <div className={`sign-up-page ${theme}`}>
        <form id='sign-up' >

            <div className='form-group'>
                <h2>Sign Up</h2>
                <p>Create an account</p>
            </div>

            <div className='form-group'>
                <TextInput label={'first name'} value={firstName} onChange={setFirstName} disabled={false} />
                <p className='validate-text'> {firstNameValid1} </p>
            </div>

            <div className='form-group'>
                <TextInput label={'last name'} value={lastName} onChange={setLastName} disabled={false} />
                <p className='validate-text'> {lastNameValid1} </p>
            </div>

            <div className='form-group'>
                <EmailInput label={'email'} value={email} onChange={setEmail} disabled={false} />
                <p className='validate-text'> {emailValid1} </p>
            </div>

            <div className='form-group'>
                <PasswordInput label={'password'} value={password} onChange={setPassword} disabled={false} />
                <p className='validate-text'> {passwordValid1} </p>
            </div>

            <div className='form-group'>
                <PasswordInput label={'re-enter password'} value={password2} onChange={setPassword2} disabled={false} />
                <p className='validate-text'> {passwordValid2} </p>
            </div>

            <div className='form-group'>
                <button onClick={handleSubmit} className={`form-submit ${allowSubmit === true ? 'active' : ''}`}>Sign Up</button>
            </div>

            <div className='form-group'>
                <p>Already have an account? <Link className={`signin ${theme}`} to='/signin'>Sign In Here</Link></p>
            </div>

        </form>
        </div>
    );
};

export default SignUp;