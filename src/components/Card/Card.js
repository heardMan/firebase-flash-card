import React, { useEffect, useState } from 'react';

import './Card.css';

const Card = props => {

    const [switchActive, setSwitchActive] = useState(false);

    const [focusFront, setFocusFront] = useState(false);
    const [cardFront, setCardFront] = useState(props.front);


    const [focusBack, setFocusBack] = useState(false);
    const [cardBack, setCardBack] = useState(props.back);
    const [cardEditActive, setCardEditActive] = useState(false);

    const [deleteCardModalOpen, setDeleteCardModalOpen] = useState(false);

    return (
        <>
            <form className='editcard'>

                <div className={`edit-card-form${switchActive === true ? ' flipped' : ''}`}>

                    <button className='delete-card' onClick={e => {
                        e.preventDefault();
                        return setDeleteCardModalOpen(true)
                    }}>
                        x
                    </button>

                    <div className='edit-card-form-2'>

                        <div className='edit-card-front'>
                            <label className={`${focusFront === true || cardBack.length > 0 ? 'editCardInFocus' : 'editCardNotInFocus'}`}>front</label>
                            <textarea
                                onFocus={() => setFocusFront(true)}
                                onBlur={() => setFocusFront(false)}
                                onChange={text => { setCardFront(text.target.value) }}
                                value={cardFront}
                                readOnly={cardEditActive === true ? false : true}
                            ></textarea>
                        </div>

                        <div className='edit-card-back'>
                            <label className={`${focusBack === true || cardBack.length > 0 ? 'editCardInFocus' : 'editCardNotInFocus'}`}>back</label>
                            <textarea
                                onFocus={() => setFocusBack(true)}
                                onBlur={() => setFocusBack(false)}
                                onChange={text => { setCardBack(text.target.value) }}
                                value={cardBack}
                                readOnly={cardEditActive === true ? false : true}
                            ></textarea>

                        </div>


                    </div>

                </div>

                <button
                    className='update-card'
                    onClick={e => {
                        e.preventDefault();
                        if (cardEditActive === false) {
                            //TODO: insert save/update fuction

                            return setCardEditActive(true)

                        }

                        props.update(props.id, cardFront, cardBack)

                        return setCardEditActive(false)

                    }}>
                    {cardEditActive === true ? 'Save' : 'Update'}
                </button>

                <div
                    className='edit-card-switch-container'
                    onClick={() => {
                        console.log('switching')
                        console.log(switchActive)
                        if (switchActive === false) {
                            return setSwitchActive(true)
                        }
                        return setSwitchActive(false)

                    }}>
                    <div className='edit-card-switch'>
                        <div className={`${switchActive === true ? 'edit-card-switch-toggle-on' : 'edit-card-switch-toggle-off'}`}>
                            <div className='edit-card-switch-toggle'></div>
                            <p className='edit-card-switch-front'>front</p>
                        </div>
                    </div>
                    <p className='edit-card-switch-back'>back</p>
                </div>



            </form>



            <div id='delete-card-modal' className={deleteCardModalOpen === true ? 'open' : ''}>

                <div id='delete-card-modal-window'>

                    <button id='delete-card-modal-close' onClick={e => setDeleteCardModalOpen(false)}>x</button>

                    <div id='delete-card-modal-content'>

                        <p>Are you sure you want to delete this card?</p>

                    </div>
                    <div id='delete-card-modal-action'>
                        <button id='delete-card-modal-affirm' onClick={e => {
                            e.preventDefault();
                            console.log('deleting...')
                            setDeleteCardModalOpen(false);
                            props.delete(props.id).catch(e => console.log(e))
                            //props.refresh()
                            
                        }}>Delete</button>
                        <button id='delete-card-modal-cancel' onClick={e => {
                            setDeleteCardModalOpen(false);
                            // setName('');
                            // setDescription('');
                        }}>Go Back</button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Card;