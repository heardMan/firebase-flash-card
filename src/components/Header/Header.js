import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth.js'
import { useNavigate } from 'react-router-dom';

import './Header.css';

const Header = () => {

    return (
        <>
        <header id='header'>
            
            <div className='title'><h1>Firebase + React Login</h1></div>
            
        </header>
        <div id='spacer'></div>
        </>
    );
};

export default Header;