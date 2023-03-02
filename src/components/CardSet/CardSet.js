import React, { useEffect, useState } from 'react';
// import Accordion from '../Accordion/Accordion';
import TextInput from '../TextInput/TextInput';
import TextArea from '../TextArea/TextArea';
// import edit from './edit.svg'
import chevron from './chevron_left.svg'
import './CardSet.css';


const CardSet = props => {

    const [open, setOpen] = useState(false)

    const [addCardModalOpen, setAddCardModalOpen] = useState(false)

    const [newCardFront, setNewCardFront] = useState('')
    const [newCardBack, setNewCardBack] = useState('')

    const [deleteCardModalOpen, setDeleteCardModalOpen] = useState(false)

    const [switchActive, setSwitchActive] = useState(false)

    const [focusFront, setFocusFront] = useState(false);
    const [focusBack, setFocusBack] = useState(false);



    return (
        <>
            <div className='card-set'>
                <div>

                    <div>
                        <div className='card-title'>{props.name}</div>
                        <div className='card-description'>{props.description}</div>
                    </div>

                    {/* control button */}
                    <button className='accordion-toggle' onClick={e => { open === false ? setOpen(true) : setOpen(false) }}>
                        <img alt='toggle icon' className={`accordion-toggle-icon ${open === true ? 'accordion-toggle-open' : ''}`} src={chevron} />
                    </button>

                    <div className='cards'>

                        <div className='accordion'>
                            {/* title element */}
                            <div className='accordion-title'>

                                <p>Card Set</p>
                            </div>
                            {/* content element */}
                            <div className={`accordion-content ${open === true ? 'accordion-open' : ''}`}>
                                <button
                                    className='add-card'
                                    onClick={() => {
                                        console.log('adding new card')
                                        if (addCardModalOpen === false) {
                                            return setAddCardModalOpen(true)

                                        }
                                        return setAddCardModalOpen(false)

                                    }}>
                                    Add New Card +
                                </button>
                                {
                                    props.cards === undefined || props.cards.length > 0
                                        ?
                                        <p>No cards yet</p>
                                        :
                                        props.cards
                                }
                            </div>
                        </div>
                    </div>

                    <button className='delete-card-set'>delete</button>

                </div>
            </div>

            <div id='add-card-modal' className={addCardModalOpen === true ? 'open' : ''}>

                <div id='add-card-modal-window'>

                    <button id='add-card-modal-close' onClick={e => setAddCardModalOpen(false)}>x</button>

                    <div id='add-card-modal-content'>

                        <form id='addcard'>

                            <div className={`add-card-form${switchActive === true ? ' flipped' : ''}`}>

                                <div className='add-card-form-2'>

                                    <div className='add-card-front'>
                                        <label className={`${focusFront === true ? 'inFocus':'noFocus'}`}>front</label>
                                        <textarea
                                            onFocus={() => setFocusFront(true)}
                                            onBlur={() => setFocusFront(false)}
                                            onChange={text => { setNewCardFront(text.target.value) }}
                                            value={newCardFront}
                                        ></textarea>
                                    </div>

                                    <div className='add-card-back'>
                                        <label className={`${focusBack === true ? 'inFocus':'noFocus'}`}>back</label>
                                        <textarea
                                            onFocus={() => setFocusBack(true)}
                                            onBlur={() => setFocusBack(false)}
                                            onChange={text => { setNewCardBack(text.target.value) }}
                                            value={newCardBack}
                                        ></textarea>
                                        {/* <TextArea label={'back'} value={newCardBack} onChange={text => { setNewCardBack(text) }} disabled={false} /> */}
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

                    </div>
                    <div id='add-card-modal-action'>
                        <button id='add-card-modal-affirm' onClick={e => {
                            e.preventDefault();
                            // CardSetController
                            //     .create(authUser.auth.uid, name, description)
                            //     .then(() => {
                            //         setName('');
                            //         setDescription('');
                            //         CardSetController
                            //             .getAllByUID(authUser.auth.uid)
                            //             .then(data => {
                            //                 setCardSets(data);
                            //                 setAddSetModalOpen(false);
                            //             })
                            //             .catch(e => console.log(e));

                            //     })
                            //     .catch(e => console.log(e))
                        }}>Save</button>
                        <button id='add-card-modal-cancel' onClick={e => {
                            setAddCardModalOpen(false);
                            // setName('');
                            // setDescription('');
                        }}>Cancel</button>
                    </div>
                </div>

            </div>


        </>
    );
};

export default CardSet;