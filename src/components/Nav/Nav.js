import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth.js'
import { Link } from 'react-router-dom';
import SignOut from '../SignOut/SignOut.js';

import menuLogo from './menu-24px-light.svg'

import './Nav.css';

const Nav = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const { authUser } = useAuth();

    const toggle = () => {
        if (menuOpen === false) {
            return setMenuOpen(true);
        }
        return setMenuOpen(false);
    }

    useEffect(() => console.log(authUser.auth), [authUser])

    return (
        <nav id='nav'>
            <button className='fab toggle' onClick={toggle}>
                <img alt='menu icon' className='toggle' src={menuLogo} />
            </button>
            <div className={menuOpen === true ? 'menu menuOpen' : 'menu'}>

                <div className='menu-bg'></div>

                <div className='menu-item' onClick={toggle}>
                    <Link to='/'>Home</Link>
                </div>

                <div className='menu-item' onClick={toggle}>
                    <Link to='https://github.com/heardMan/firebase-auth-react'>GitHub</Link>
                </div>

                <div className='menu-item' onClick={toggle}>
                    <Link to='./faq'>FAQ</Link>
                </div>

                {
                    authUser === null || authUser.auth === null ?
                        ''
                        :
                        <div className='menu-item' onClick={toggle}>
                            <Link to='./cardsets'>Card Sets</Link>
                        </div>

                }

                {
                    authUser === null || authUser.auth === null ?
                        ''
                        :
                        <SignOut />

                }
            </div>
        </nav>
    );
};

export default Nav;