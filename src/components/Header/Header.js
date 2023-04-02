import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth.js'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/Theme.js';

import './Header.css';

const Header = () => {

    const {theme} = useTheme();

    return (
        <>
        <header id='header' className={`${theme}`}>
            
            <div className='title'><h1>Quick Cards</h1></div>
            
        </header>
        <div id='spacer'></div>
        </>
    );
};

export default Header;