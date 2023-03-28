import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faHouse, faLayerGroup, faUser, faQuestion, faComment, faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons';

import './Modal.css';

const Modal = (props, children) => {


    return (
        <div id='modal' className={addSetModalOpen === true ? 'open' : ''}>

            <div id='modal-window'>
                <button id='modal-close' onClick={e => {
                    document.body.style.overflow = 'unset';
                    setAddSetModalOpen(false)

                }}><FontAwesomeIcon title='Close Add Set Modal' color={'#e8e8e8'} size={'2x'} icon={faXmark} /></button>
                <div id='add-set-modal-content'>

                  

                </div>
                <div id='add-set-modal-action'>
                    <button id='add-set-modal-affirm' onClick={e => {
                        
                        e.preventDefault();
                        document.body.style.overflow = 'unset';
                        props.affirm();
                        props.close();
                    }}>
                        <FontAwesomeIcon title='Close Delete Account Modal' color='#e8e8e8' size='3x' icon={faCheck} />
                    </button>
                    <button id='add-set-modal-cancel' onClick={e => {
                        e.preventDefault();
                        document.body.style.overflow = 'unset';
                        props.close();
                        
                    }}>
                        <FontAwesomeIcon title='Close Delete Account Modal' color='#e8e8e8' size='3x' icon={faXmark} />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Modal;