import React, { useEffect, useState } from 'react';

import './Card.css';

const Card = props => {

    const [switchActive, setSwitchActive] = useState(false);

    const [focusFront, setFocusFront] = useState(false);
    const [cardFront, setCardFront] = useState(props.front);

    const [focusBack, setFocusBack] = useState(false);
    const [cardBack, setCardBack] = useState(props.back);
    
    return (
        <>
        <form  className='addcard'>

        <div className={`add-card-form${switchActive === true ? ' flipped' : ''}`}>

            <div className='add-card-form-2'>

                <div className='add-card-front'>
                    <label className={`${focusFront === true || cardBack.length > 0 ? 'inFocus' : 'noFocus'}`}>front</label>
                    <textarea
                        onFocus={() => setFocusFront(true)}
                        onBlur={() => setFocusFront(false)}
                        onChange={text => { setCardFront(text.target.value) }}
                        value={cardFront}
                    ></textarea>
                </div>

                <div className='add-card-back'>
                    <label className={`${focusBack === true || cardBack.length > 0 ? 'inFocus' : 'noFocus'}`}>back</label>
                    <textarea
                        onFocus={() => setFocusBack(true)}
                        onBlur={() => setFocusBack(false)}
                        onChange={text => { setCardBack(text.target.value) }}
                        value={cardBack}
                    ></textarea>
                   
                </div>


            </div>

        </div>





        <div
            className='switch-container'
            onClick={() => {
                console.log('switching')
                console.log(switchActive)
                if (switchActive === false) {
                    return setSwitchActive(true)
                }
                return setSwitchActive(false)

            }}>
            <div className='switch'>
                <div className={`${switchActive === true ? 'switch-toggle-on' : 'switch-toggle-off'}`}>
                    <div className='switch-toggle'></div>
                    <p className='switch-front'>front</p>
                </div>
            </div>
            <p className='switch-back'>back</p>
        </div>



    </form>
    </>
    );
};

export default Card;