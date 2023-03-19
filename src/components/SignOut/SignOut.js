import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth.js'
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import './SignOut.css';

const SignOut = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate('/signin');
            
        }
        catch (e) {
            console.log(e.message)
        }
    }

    return (<button className='signOut' onClick={handleLogOut}><span><FontAwesomeIcon title='Sign Out' color={'#e8e8e8'} size={'3x'} icon={faRightFromBracket}/></span></button>);
};

export default SignOut;