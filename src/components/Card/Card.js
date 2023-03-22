import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faCheck, faChevronRight, faChevronLeft, faFloppyDisk, faPen } from '@fortawesome/free-solid-svg-icons';

import './Card.css';

const Card = props => {

    const [switchActive, setSwitchActive] = useState(false);

    const [focusFront, setFocusFront] = useState(false);
    const [cardFront, setCardFront] = useState(props.displayCard.front);


    const [focusBack, setFocusBack] = useState(false);
    const [cardBack, setCardBack] = useState(props.displayCard.back);
    const [cardEditActive, setCardEditActive] = useState(false);

    const [deleteCardModalOpen, setDeleteCardModalOpen] = useState(false);

    useEffect(()=>{
        if(props.displayCard!==undefined){
            setCardFront(props.displayCard.front);
            setCardBack(props.displayCard.back);
        }
    },[props.displayCard])

    return (
        <div className='card-small'>
            <form className='editcard'>

                <div className={`edit-card-form${switchActive === true ? ' flipped' : ''}`}>

                    <button className='delete-card' onClick={e => {
                        e.preventDefault();
                        return setDeleteCardModalOpen(true)
                    }}>
                        <FontAwesomeIcon title='Close Menu' color={'#e8e8e8'} size={'2x'} icon={faXmark} />
                    </button>

                    <div className='edit-card-form-2'>

                        <div className='edit-card-front'>

                            <label className={`${focusFront === true || cardFront.length > 0 ? 'editCardInFocus' : 'editCardNotInFocus'}`}>front</label>
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
                            
                            

                            return setCardEditActive(true)

                        }

                        console.log(props.displayCard.id)

                            props.update(
                                props.displayCard.id,
                                cardFront,
                                cardBack
                                )

                        //props.update(props.id, cardFront, cardBack)

                        return setCardEditActive(false)

                    }}>
                    {cardEditActive === true ? <FontAwesomeIcon title='Close Menu' color={'#e8e8e8'} size={'2x'} icon={faFloppyDisk} /> : <FontAwesomeIcon title='Close Menu' color={'#e8e8e8'} size={'2x'} icon={faPen} />}
                </button>


                <button
                    className='prev-card'
                    onClick={e => {
                        e.preventDefault();
                        
                        console.log('previous card');
                        props.last();
                        

                    }}>
                    <FontAwesomeIcon title='Last Card' color={'#e8e8e8'} size={'2x'} icon={faChevronLeft} />
                </button>

                <div className='card-info'>
                    {props.idx+1} / {props.cardCount}
                </div>



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
                    <p className={`${switchActive === true ? 'edit-card-switch-back-off' : 'edit-card-switch-back-on'}`}>back</p>
                </div>

                <button
                    className='next-card'
                    onClick={e => {
                        e.preventDefault();
                        console.log('next card');
                        props.next()

                    }}>
                    <FontAwesomeIcon title='Next Card' color={'#e8e8e8'} size={'2x'} icon={faChevronRight} />
                </button>



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
        </div>
    );
};

export default Card;