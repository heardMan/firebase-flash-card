import React, { useEffect, useState } from 'react';

import chevron from './chevron_left.svg'

import './Accordion.css';

const Accordion = props => {

    const [open, setOpen] = useState(props.open)

    return (
        <div className='accordion'>
            
            {/* title element */}
            <div className='accordion-title'>
                {/* control button */}
            <button className='accordion-toggle' onClick={e => { open === false?setOpen(true):setOpen(false) }}>
                <img alt='toggle icon' className={`accordion-toggle-icon ${open === true ? 'accordion-toggle-open' : ''}`} src={chevron} />
            </button>
            <p>{props.title}</p>
            </div>
            {/* content element */}
            <div className={`accordion-content ${open === true ? 'accordion-open' : ''}`}>{props.children}</div>
        </div>
    );
};

export default Accordion;