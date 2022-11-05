import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth.js'
import { useNavigate } from 'react-router-dom';

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

    return (<button className='signOut' onClick={handleLogOut}><span>Sign Out</span></button>);
};

export default SignOut;