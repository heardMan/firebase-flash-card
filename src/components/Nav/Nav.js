import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth.js'
import { Link } from 'react-router-dom';
import SignOut from '../SignOut/SignOut.js';

import Chat from '../Chat/Chat.js';

//import menuLogo from './menu-24px-light.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faHouse, faLayerGroup, faUser, faQuestion, faComment, faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import './Nav.css';

const Nav = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [chatOpen, setChatOpen] = useState(false)

    const { authUser } = useAuth();

    const toggle = () => {
        if (menuOpen === false) {
            document.body.style.overflow = 'hidden';
            return setMenuOpen(true);
        }
        document.body.style.overflow = 'unset';
        return setMenuOpen(false);
    }

    useEffect(() => console.log(authUser.auth), [authUser])

    return (
        <>
        <nav id='nav'>
            <button className='fab toggle' onClick={toggle}>
                {/* <img alt='menu icon' className='toggle' src={menuLogo} /> */}

                {menuOpen === true ? <FontAwesomeIcon title='Close Menu' color={'#e8e8e8'} size={'3x'} icon={faXmark} /> : <FontAwesomeIcon title='Open Menu' color={'#e8e8e8'} size={'3x'} icon={faBars} />}

            </button>
            <div className={menuOpen === true ? 'menu menuOpen' : 'menu'}>

                <div className='menu-bg'></div>

                <div className='menu-item-container' >
                    <div className='menu-item' onClick={toggle}>
                        <Link to='./account'><FontAwesomeIcon title='Account' color='#e8e8e8' size='2x' icon={faUser} /></Link>
                    </div>
                </div>

                {
                    authUser === null || authUser.auth === null ?
                        ''
                        :
                        <>

                            <div className='menu-item-container' >
                                <div className='menu-item' onClick={toggle}>
                                    <Link to='./cardsets'><FontAwesomeIcon title='Card Sets' color='#e8e8e8' size='2x' icon={faLayerGroup} /></Link>
                                </div>
                            </div>


                        </>

                }

                <div className='menu-item' onClick={(e) => {
                    e.preventDefault();
                    setChatOpen(true)
                }} >
                    <Link to='#'><FontAwesomeIcon title='Contact' color='#e8e8e8' size='2x' icon={faComment} /></Link>
                    
                </div>

                {/* <div className='menu-item' onClick={toggle}>
                    <Link to='https://github.com/heardMan/firebase-auth-react'><FontAwesomeIcon title='GitHub' color='#e8e8e8' size='3x' icon={faGithub}/></Link>
                </div> */}

                {/* <div className='menu-item' onClick={toggle}>
                    <Link to='./faq'><FontAwesomeIcon title='Frequently Asked Questions' color='#e8e8e8' size='2x' icon={faQuestion}/></Link>
                </div> */}



                {/* <div className='menu-item' onClick={toggle}>
                    <Link to='./faq'><FontAwesomeIcon title='Donate' color='#e8e8e8' size='2x' icon={faCircleDollarToSlot}/>Donate</Link>
                </div> */}



                {
                    authUser === null || authUser.auth === null ?
                        ''
                        :
                        <div className='menu-item-container' >
                            <div className='menu-item' onClick={toggle}>
                                <SignOut />
                            </div>
                        </div>

                }
            </div>
        </nav>
        {
                    authUser === null || authUser.auth === null || authUser.auth===undefined ?
                        ''
                        :
                        
                        <Chat open={chatOpen} setOpen={setChatOpen} user={authUser.auth.uid}/>

                }
        
        </>
    );
};

export default Nav;