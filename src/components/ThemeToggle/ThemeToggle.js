import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/Theme';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';

import './ThemeToggle.css';

const ThemeToggle = () => {

    const [switchActive, setSwitchActive] = useState(false);

    const { theme, toggleTheme } = useTheme()

    return (

        <div
            className='theme-switch-container'
            onClick={() => {
                console.log('theme:')
                console.log(theme)
                toggleTheme()

                if (switchActive === false) {
                    return setSwitchActive(true)
                }
                return setSwitchActive(false)

            }}>
            <div className={`theme-switch-${theme}`}>
                <div className={`${switchActive === true ? 'theme-switch-toggle-on' : 'theme-switch-toggle-off'}`}>
                    <div className={`theme-switch-toggle-${theme}`}></div>
                    <p className='theme-switch-front'>
                        <FontAwesomeIcon title='Edit First Name' color='#CFD8DC' size='2x' icon={faMoon} />
                    </p>
                </div>
            </div>
            <p className={`${switchActive === true ? 'theme-switch-back-off' : 'theme-switch-back-on'}`}>
                <FontAwesomeIcon title='Edit First Name' color='#00695C' size='2x' icon={faSun} />
            </p>
        </div>


    );
};

export default ThemeToggle;



