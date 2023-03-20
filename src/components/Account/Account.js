import React, { useCallback, useEffect, useState } from 'react';
import User from '../../controllers/User.js';
import { useAuth } from '../../contexts/Auth.js'
import SignOut from '../SignOut/SignOut.js';
import TextInput from '../TextInput/TextInput.js';
import EmailInput from '../EmailInput/EmailInput.js';
import PasswordInput from '../PasswordInput/PasswordInput.js';
import { Link, useNavigate } from 'react-router-dom';

import './Account.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faFloppyDisk, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';

const Account = () => {

    const {
        authUser,
        updateUserEmail,
        updateUserPassword,
        updateAppUserProfile,
        deleteUserAccount,
        reAuthenticateUser,
        verifyEmail
    } = useAuth();

    const navigate = useNavigate();


    const [fName, setFName] = useState(authUser.profile !== undefined ? authUser.profile.firstName : 'user not found');
    const [fNameActive, setFNameActive] = useState(false);
    const [firstNameValid1, setFirstNameValid1] = useState('');
    const [allowFNameSave, setAllowFNameSave] = useState(false)

    const [lName, setLName] = useState(authUser.profile !== undefined ? authUser.profile.lastName : 'user not found');
    const [lNameActive, setLNameActive] = useState(false);
    const [lastNameValid1, setLastNameValid1] = useState('');
    const [allowLNameSave, setAllowLNameSave] = useState(false)

    const [email, setEmail] = useState(authUser.profile !== undefined ? authUser.profile.email : 'user not found');
    const [emailActive, setEmailActive] = useState(false);
    const [emailValid1, setEmailValid1] = useState('');
    const [allowEmailSave, setAllowEmailSave] = useState(false)

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordActive, setPasswordActive] = useState(false);
    const [allowPasswordSave, setAllowPasswordSave] = useState(false)

    const [passwordValid1, setPasswordValid1] = useState('');
    const [passwordValid2, setPasswordValid2] = useState('');


    const [trashIconColor, setTrashIconColor] = useState('#C0392B');

    //const [reauthEmail, setReauthEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [verifyModalOpen, setVerifyModalOpen] = useState(false);

    const updateUser = async () => {

        if (email !== authUser.profile.email) {
            const newEmail = await updateUserEmail(email);
            console.log(newEmail)
            updateAppUserProfile({
                firstName: fName,
                lastName: lName,
                email: email
            })

            setEmailActive(false);
            

        }

        if (fName !== authUser.profile.firstName) {
            updateAppUserProfile({
                firstName: fName,
                lastName: lName,
                email: email
            }).then(()=>{
                setFNameActive(false);
                setFName(fName)
            });
            

        }

        if (lName !== authUser.profile.lastName) {
            updateAppUserProfile({
                firstName: fName,
                lastName: lName,
                email: email
            });
            setLNameActive(false);

        }

        if (
            password !== 'password' &&
            password.length > 5 &&
            password === confirmPassword) {

            setPasswordActive(false);
            return await updateUserPassword(password)
                .then(d => {
                    console.log(d);
                    
                })
                .catch(e => {
                    console.log(e.message);
                    if (e.message === 'Firebase: Error (auth/requires-recent-login).') {
                        setModalOpen(true)
                    }

                });

                
            
            

        }

        

    }

    const deleteUser = async () => {
        console.log('deleting account');
        const deleted = deleteUserAccount().then(data => {
            console.log(data)
            navigate('/signin');
        }).catch(e => {
            console.log(e);
            if (e.message === 'Firebase: Error (auth/requires-recent-login).') {
                setModalOpen(true)
            }

        });
        console.log(deleted)


    }

    useEffect(() => {

        console.log('auth prof')
        console.log(authUser)

        if(fName==='user not found' && authUser !== {} && authUser.profile !== undefined){
            setFName(authUser.profile.firstName)
        }

        if(lName==='user not found' && authUser !== {} && authUser.profile !== undefined){
            setLName(authUser.profile.lastName)
        }

        if(email==='user not found' && authUser !== {} && authUser.profile !== undefined){
            setEmail(authUser.profile.email)
        }

        const validateFirstName = () =>
            fName.length < 2
                ?
                setFirstNameValid1('please provide your first name')
                :
                setFirstNameValid1('');


        const validateLastName = () =>
            lName.length < 2
                ?
                setLastNameValid1('please provide your last name')
                :
                setLastNameValid1('');


        const validateEmail = () =>
            email.length < 6
                ?
                setEmailValid1('please provide a valid email')
                :
                setEmailValid1('');


        const validatePassword1 = () =>
            password.length < 6 && password.length > 0
                ?
                setPasswordValid1('password must be at least 6 character long')
                :
                setPasswordValid1('');


        const validateConfirmPassword = () =>
            confirmPassword !== password
                ?
                setPasswordValid2('passwords do not match')
                :
                setPasswordValid2('');


        validateFirstName();
        validateLastName();
        validateEmail();
        validatePassword1();
        validateConfirmPassword();

        if(firstNameValid1 === '') {
            setAllowFNameSave(true)
        } else { 
            setAllowFNameSave(false)
        }

        if(lastNameValid1 === '') {
            setAllowLNameSave(true)
        } else { 
            setAllowLNameSave(false)
        }

        if(emailValid1 === '') {
            setAllowEmailSave(true)
        } else { 
            setAllowEmailSave(false)
        }

        if(passwordValid1 === '' && passwordValid2 === '') {
            setAllowPasswordSave(true)
        } else { 
            setAllowPasswordSave(false)
        }



    }, [authUser, firstNameValid1, fName, 
        lName, lastNameValid1, emailValid1, 
        email, passwordValid1, password, 
        passwordValid2, confirmPassword])

    return (
        <div>

            <div className='account-info'>
                {/* <p>Auth Obj: {JSON.stringify(authUser)}</p> */}

                <div className='account-field'>
                    <div className='account-input'>
                        <TextInput
                            label={'first name'}
                            value={fName}
                            onChange={setFName}
                            disabled={fNameActive === true ? false : true} />
                        <p className='validate-text'> {firstNameValid1} </p>
                    </div>
                    <div className='account-action'>




                        <button

                            className={`${fNameActive === false ? 'account-edit' : 'account-save'} ${allowFNameSave === true ? 'active' : ''}`}
                            
                            onClick={e => {

                                e.preventDefault();

                                if(fNameActive === false){
                                    return setFNameActive(true)
                                }

                                if(fNameActive === true && allowFNameSave === true){
                                    setFNameActive(false)
                                    updateUser()

                                }

                            }
                            }>

                            {fNameActive === false ?
                                <FontAwesomeIcon title='Edit First Name' color='#e8e8e8' size='2x' icon={faPen} />
                                :
                                <FontAwesomeIcon title='Save First Name' color='#e8e8e8' size='2x' icon={faFloppyDisk} />
                            }
                        </button>
                    </div>
                </div>

                <div className='account-field'>
                    <div className='account-input'>
                        <TextInput
                            label={'last name'}
                            value={lName}
                            onChange={setLName}
                            disabled={lNameActive === true ? false : true} />
                            <p className='validate-text'> {lastNameValid1} </p>
                    </div>
                    <div className='account-action'>
                        <button 
                        className={`${lNameActive === false ? 'account-edit' : 'account-save'} ${allowLNameSave === true ? 'active' : ''}`}
                        onClick={e => {

                            e.preventDefault();

                            if(lNameActive === false){
                                return setLNameActive(true)
                            }

                            if(lNameActive === true && allowLNameSave === true){
                                setLNameActive(false)
                                updateUser()

                            }

                        }
                        }>


                            {lNameActive === false ?
                                <FontAwesomeIcon title='Edit Last Name' color='#e8e8e8' size='2x' icon={faPen} />
                                :
                                <FontAwesomeIcon title='Save Last Name' color='#e8e8e8' size='2x' icon={faFloppyDisk} />
                            }
                        </button>
                    </div>
                </div>

                <div className='account-field'>
                    <div className='account-input'>
                        <EmailInput
                            label={'email'}
                            value={email}
                            onChange={setEmail}
                            disabled={emailActive === true ? false : true}
                            onBlur={e => {
                                e.preventDefault()
                                return setEmail(authUser.profile.email)
                            }} />
                            <p className='validate-text'> {emailValid1} </p>
                    </div>
                    <div className='account-action'>
                        <button 
                        className={`${emailActive === false ? 'account-edit' : 'account-save'} ${allowEmailSave === true ? 'active' : ''}`}
                        onClick={e => {

                            e.preventDefault();

                            if(emailActive === false){
                                return setEmailActive(true)
                            }

                            if(emailActive === true && allowEmailSave === true){
                                setEmailActive(false)
                                updateUser()

                            }

                        }
                        }>

                            {emailActive === false ?
                                <FontAwesomeIcon title='Edit Email' color='#e8e8e8' size='2x' icon={faPen} />
                                :
                                <FontAwesomeIcon title='Save Email' color='#e8e8e8' size='2x' icon={faFloppyDisk} />
                            }
                        </button>
                    </div>
                </div>
                <div className='email-verified'>
                    {
                        authUser.auth === null || authUser.auth === undefined ?
                            <p className='verified'>email Verified</p>
                            :
                            authUser.auth.emailVerified === true ?
                                <p className='verified'>email Verified</p>
                                :
                                <>
                                    <p className='unverified'>email Not Verified</p>
                                    <button id='verify-email' onClick={e => {
                                        verifyEmail().then(res => {

                                            console.log(JSON.stringify(res))
                                            setVerifyModalOpen(true)
                                        }).catch(e => {
                                            console.log(JSON.stringify(e))
                                        })

                                    }}>
                                        Send Verification
                                    </button>
                                </>}
                </div>






                <div className='account-field'>
                    <div className='account-input'>
                        <PasswordInput label={'password'} value={password} onChange={setPassword} disabled={passwordActive === true ? false : true} />
                        <p className='validate-text'> {passwordValid1} </p>
                    </div>
                    <div className='account-action'>
                        <button 
                        className={`${passwordActive === false ? 'account-edit' : 'account-save'} ${allowPasswordSave === true ? 'active' : ''}`}
                        onClick={e => {

                            e.preventDefault();

                            if(passwordActive === false){
                                return setPasswordActive(true)
                            }

                            if(passwordActive === true && allowPasswordSave === true){
                                setPasswordActive(false)
                                updateUser()

                            }

                        }
                        }>
                            {passwordActive === false ?
                                <FontAwesomeIcon title='Edit Password' color='#e8e8e8' size='2x' icon={faPen} />
                                :
                                <FontAwesomeIcon title='Save Password' color='#e8e8e8' size='2x' icon={faFloppyDisk} />
                            }
                        </button>
                    </div>
                </div>

                <div className={passwordActive === false ? 'account-field hide-confirm' : 'account-field open-confirm'}>
                    <div className='account-input-confirm'>
                        <PasswordInput label={'confirm password'} value={confirmPassword} onChange={setConfirmPassword} disabled={passwordActive === true ? false : true} />
                        <p className='validate-text'> {passwordValid2} </p>
                    </div>
                </div>



                <div className='account-field'>

                    <button id='delete-account'
                        onClick={() => setDeleteModalOpen(true)}
                        onMouseOver={e => {
                            e.preventDefault()
                            setTrashIconColor('#e8e8e8')
                        }}
                        onMouseLeave={e => {
                            e.preventDefault()
                            setTrashIconColor('#C0392B')
                        }}
                        onMouseDown={e => {
                            e.preventDefault()
                            setTrashIconColor('#e8e8e8')
                        }}
                        onMouseUp={e => {
                            e.preventDefault()
                            setTrashIconColor('#C0392B')
                        }}
                    >
                        <FontAwesomeIcon
                            title='Delete Account'
                            color={trashIconColor}
                            size='1x'
                            icon={faTrash}
                            style={{ transition: '0.5s', marginRight: '0.5rem' }}
                        />
                        Delete My Account
                    </button>
                </div>





            </div>

            {/* <div>
                <SignOut />
            </div> */}

            {/* Email verification sent confirmation modal */}
            <div className={verifyModalOpen === true ? 'verifyModal open' : 'verifyModal'}>
                <div className='verifyModal-content'>
                    <button className='close-verify-modal' onClick={e => {
                        setDeleteModalOpen(false)
                    }}>x</button>
                    <div className='verifyModal-text'>
                        <h3>A verification link has been sent to your email</h3>
                    </div>
                    <div className='verifyModal-action'>
                        <button onClick={() => setVerifyModalOpen(false)}>Go Back</button>
                    </div>


                </div>
            </div>

            {/* Account delete confirmation modal */}
            <div className={deleteModalOpen === true ? 'deleteModal open' : 'deleteModal'}>
                <div className='deleteModal-content'>
                    <button className='close-delete-modal' onClick={e => {
                        setDeleteModalOpen(false)
                    }}><FontAwesomeIcon title='Close Delete Account Modal' color='#e8e8e8' size='2x' icon={faXmark} /> </button>
                    <div className='deleteModal-text'>
                        <h3>You are about to delete your account.</h3>
                        <h3>This action cannot be reversed.</h3>
                        <h3>Do you want to continue?</h3>
                    </div>
                    <div className='deleteModal-action'>
                        <button className='delete-account-btn' onClick={deleteUser} >Delete Account</button>
                        <button className='go-back-btn' onClick={() => setDeleteModalOpen(false)}>Go Back</button>

                    </div>


                </div>
            </div>

            {/* Reauthorization modal */}
            <div className={modalOpen === true ? 'reauthModal open' : 'reauthModal'}>
                <div className='reauthModal-content'>
                    <button className='close-modal' onClick={e => {
                        setModalOpen(false)
                    }}>x</button>
                    <div className='reauth-form'>
                        <h3>Before you perform this action, you need to enter your current password</h3>
                        <div className='form-group'>
                            <PasswordInput label={'Re enter Password'} value={currentPassword} onChange={setCurrentPassword} disabled={false} />
                        </div>
                        <div className='form-group'>
                            <button
                                onClick={async e => {
                                    e.preventDefault();
                                    const newPAss = await reAuthenticateUser(currentPassword)
                                        .then(res => {
                                            console.log(JSON.stringify(res))
                                            setModalOpen(false);

                                        }).catch(e => {
                                            console.log(JSON.stringify(e))
                                            console.log(e.message);
                                        })
                                    console.log(newPAss)
                                }}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>






        </div>
    );
};

export default Account;