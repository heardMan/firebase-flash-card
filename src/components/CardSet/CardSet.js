import React, { useEffect, useState } from 'react';
import Accordion from '../Accordion/Accordion';
import edit from './edit.svg'
import './CardSet.css';

const CardSet = props => {


    return (
        <div className='card-set'>
            <div>
                <div>
                    <div className='card-title'>{props.name}</div>
                    <div className='card-description'>{props.description}</div>

                </div>
                <div className='cards'>
                    <Accordion title={'Card Set'}>
                    {props.cards === undefined || props.cards.length > 0 ? 'No cards yet' : props.cards}

                    </Accordion>
                </div>
                <div className='card-set-controls'>
                    <button className='edit-card-set'>
                        <img alt='edit icon' className='edit-card-set-icon' src={edit} />
                    </button>
                    <button className='delete-card-set'>delete</button>
                </div>
            </div>


        </div>
    );
};

export default CardSet;