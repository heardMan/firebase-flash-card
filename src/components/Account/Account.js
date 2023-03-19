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

    
    const [fName, setFName] = useState('');
    const [fNameActive, setFNameActive] = useState(false);
    const [lName, setLName] = useState('');
    const [lNameActive, setLNameActive] = useState(false);
    const [email, setEmail] = useState('');
    const [emailActive, setEmailActive] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordActive, setPasswordActive] = useState(false);
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
            });
        }

        if (fName !== authUser.profile.firstName || lName !== authUser.profile.lastName) {
            updateAppUserProfile({
                firstName: fName,
                lastName: lName,
                email: email
            });

        }

        if (
            password !== 'password' &&
            password.length > 5 &&
            password == confirmPassword) {

            const newPassword = await updateUserPassword(password)
                .then(d => console.log(d))
                .catch(e => {
                    console.log(e.message);
                    if (e.message === 'Firebase: Error (auth/requires-recent-login).') {
                        setModalOpen(true)
                    }

                });
            console.log(newPassword);

        }

        setFNameActive(false);
        setLNameActive(false);
        setEmailActive(false);
        setPasswordActive(false);

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

        const firstName = authUser.profile !== undefined ? (authUser.profile !== undefined ? authUser.profile.firstName : 'first name not found') : 'loading...';
        const lastName = authUser.profile !== undefined ? (authUser.profile !== undefined ? authUser.profile.lastName : 'first name not found') : 'loading...';
        const emailAddress = authUser.profile !== undefined ? (authUser.profile !== undefined ? authUser.profile.email : 'first name not found') : 'loading...';

        setFName(firstName);
        setLName(lastName);
        setEmail(emailAddress)

    }, [authUser])

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
                        onBlur={e=>{
                            e.preventDefault()
                            return setFName(authUser.profile.firstName)
                        }} 
                        disabled={fNameActive === true ? false : true} />
                    </div>
                    <div className='account-action'>
                        <button className='account-edit' onClick={e => fNameActive === false ? setFNameActive(true) : updateUser()}>
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
                    </div>
                    <div className='account-action'>
                        <button className='account-edit' onClick={e => lNameActive === false ? setLNameActive(true) : updateUser()}>
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
                        onBlur={e=>{
                            e.preventDefault()
                            return setEmail(authUser.profile.email)
                        }} />
                    </div>
                    <div className='account-action'>
                        <button className='account-edit' onClick={e => emailActive === false ? setEmailActive(true) : updateUser()}>
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
                    </div>
                    <div className='account-action'>
                        <button className='account-edit' onClick={e => passwordActive === false ? setPasswordActive(true) : updateUser()}>
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
                    </div>
                </div>



                <div className='account-field'>

                    <button id='delete-account' 
                    onClick={() => setDeleteModalOpen(true)}
                    onMouseOver={e=>{
                        e.preventDefault()
                        setTrashIconColor('#e8e8e8')
                    }}
                    onMouseLeave={e=>{
                        e.preventDefault()
                        setTrashIconColor('#C0392B')
                    }}
                    onMouseDown={e=>{
                        e.preventDefault()
                        setTrashIconColor('#e8e8e8')
                    }}
                    onMouseUp={e=>{
                        e.preventDefault()
                        setTrashIconColor('#C0392B')
                    }}
                    > 
                    <FontAwesomeIcon 
                    title='Delete Account' 
                    color={trashIconColor} 
                    size='1x' 
                    icon={faTrash} 
                    style={{transition:'0.5s',marginRight:'0.5rem'}}
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