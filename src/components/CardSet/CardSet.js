import React, { useEffect, useState } from 'react';
// import Accordion from '../Accordion/Accordion';
import TextInput from '../TextInput/TextInput';
import TextArea from '../TextArea/TextArea';
import Card from '../Card/Card'
// import edit from './edit.svg';
import CardController from '../../controllers/Card.js';
import chevron from './chevron_left.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faPen, faChevronRight, faTrash, faRotateLeft, faCheck, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

import './CardSet.css';



const CardSet = props => {

    const [open, setOpen] = useState(false);

    const [addCardModalOpen, setAddCardModalOpen] = useState(false);

    const [newCardFront, setNewCardFront] = useState('');
    const [newCardBack, setNewCardBack] = useState('');

    const [deleteCardSetModalOpen, setDeleteCardSetModalOpen] = useState(false);

    const [switchActive, setSwitchActive] = useState(false);

    const [focusFront, setFocusFront] = useState(false);
    const [focusBack, setFocusBack] = useState(false);

    const [editSetModalOpen, setEditSetModalOpen] = useState(false);

    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);

    const [cards, setCards] = useState([]);

    const [displayCard, setDisplayCard] = useState({id:'',front:'',back:''});

    const [deleteCardModalOpen, setDeleteCardModalOpen] = useState(false);
    

    const createCard = () => {

        CardController
            .create(props.id, newCardFront, newCardBack)
            .then(() => {
                CardController
                    .getAllBySetID(props.id)
                    .then(data => setCards(data))
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));

    }

    const updateCard = (id, front, back) => {
        CardController
            .update(id, { front: front, back: back })
            .then(() => console.log('update card'))
            .catch(e => console.log(e));
    }

    const deleteCard = id => {
        CardController
            .delete(id)
            .then(() => {
                CardController
                    .getAllBySetID(props.id)
                    .then(data => setCards(data))
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }

    const nextCard = () => {

        console.log('next card');

        const currentIndex = cards.indexOf(displayCard);

        let nextIndex = currentIndex + 1

        if (nextIndex === cards.length) {
            nextIndex = 0
        }
        console.log(nextIndex)
        console.log(cards[nextIndex])

        return setDisplayCard(cards[nextIndex])
    }

    const lastCard = () => {
        console.log('last card');
        const currentIndex = cards.indexOf(displayCard);

        let lastIndex = currentIndex - 1

        if (currentIndex === 0) {
            lastIndex = cards.length-1
        }

        return setDisplayCard(cards[lastIndex])

    }


    useEffect(() => {

        if (props.id !== undefined) {
            console.log(props.id)
            CardController
                .getAllBySetID(props.id)
                .then(data => {
                    setCards(data);
                    if (data.length === 0) {
                        return setDisplayCard({ id: '', front: '', back: '' })
                    }
                    return setDisplayCard(data[0]);
                })
                .catch(e => console.log(e));

        }
        console.log(props)
    }, [])


    return (
        <>
            <div className='card-set'>
                <div>

                    <div>
                        <div className='card-title'>{props.name}</div>
                        <div className='card-description'>{props.description}</div>
                    </div>

                    <div className='cardset-controls'>
                        <button
                            className='add-card'
                            onClick={() => {
                                console.log('adding new card')
                                if (addCardModalOpen === false) {
                                    return setAddCardModalOpen(true)

                                }
                                return setAddCardModalOpen(false)

                            }}>
                            <FontAwesomeIcon title='Add Card'  color={'#e8e8e8'} size={'1x'} icon={faPlus} /> Card
                        </button>

                        <button
                            className='edit-card-set-info'
                            onClick={() => {
                                console.log('editing old card')
                                if (editSetModalOpen === false) {
                                    return setEditSetModalOpen(true)

                                }
                                return setEditSetModalOpen(false)

                            }}>
                            <FontAwesomeIcon title='Edit Set Info'  color={'#e8e8e8'} size={'1x'} icon={faPen} /> Info 
                        </button>

                    </div>

                    {/* control button */}
                    <button className='accordion-toggle' onClick={e => { open === false ? setOpen(true) : setOpen(false) }}>
                        {/* <img alt='toggle icon' className={`accordion-toggle-icon ${open === true ? 'accordion-toggle-open' : ''}`} src={chevron} /> */}
                        <FontAwesomeIcon title='View Cards'  rotation={`${open === true ? '90' : '0'}`} color={'#e8e8e8'} size={'3x'} icon={faChevronRight} />
                    </button>



                    <div className='cards'>

                        <div className='accordion'>
                            {/* title element */}
                            <div className='accordion-title'>
                            </div>
                            {/* content element */}
                            <div className={`accordion-content ${open === true ? 'accordion-open' : ''}`}>


                                {
                                    cards === undefined || cards.length === 0
                                        ?
                                        <p>No cards yet</p>
                                        :
                                        <div className='cardList'>
                          



                                            <Card
                                                displayCard={displayCard}
                                                update={updateCard}
                                                delete={setDeleteCardModalOpen}
                                                idx={cards.indexOf(displayCard)}
                                                cardCount={cards.length}
                                                next={nextCard}
                                                last={lastCard}
                                            />



                                        </div>

                                }
                            </div>
                        </div>
                    </div>

                    <button className='delete-card-set' onClick={() => setDeleteCardSetModalOpen(true)}>
                    <FontAwesomeIcon title='Close Menu' color={'#e8e8e8'} size={'2x'} icon={faXmark} />
                    </button>

                </div>
            </div>

            <div id='add-card-modal' className={addCardModalOpen === true ? 'open' : ''}>

                <div id='add-card-modal-window'>

                    <button id='add-card-modal-close' onClick={e => setAddCardModalOpen(false)}>
                    <FontAwesomeIcon title='Close Edit Card Set Info Modal' color={'#e8e8e8'} size={'2x'} icon={faXmark} />
                    </button>

                    <div id='add-card-modal-content'>

                        <form id='addcard'>

                            <div className={`add-card-form${switchActive === true ? ' flipped' : ''}`}>

                                <div className='add-card-form-2'>

                                    <div className='add-card-front'>
                                        <label className={`${focusFront === true || newCardBack.length > 0 ? 'inFocus' : 'noFocus'}`}>front</label>
                                        <textarea
                                            onFocus={() => setFocusFront(true)}
                                            onBlur={() => setFocusFront(false)}
                                            onChange={text => { setNewCardFront(text.target.value) }}
                                            value={newCardFront}
                                        ></textarea>
                                    </div>

                                    <div className='add-card-back'>
                                        <label className={`${focusBack === true || newCardBack.length > 0 ? 'inFocus' : 'noFocus'}`}>back</label>
                                        <textarea
                                            onFocus={() => setFocusBack(true)}
                                            onBlur={() => setFocusBack(false)}
                                            onChange={text => { setNewCardBack(text.target.value) }}
                                            value={newCardBack}
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
                                <p className={`${switchActive === true ? 'switch-back-off' : 'switch-back-on'}`}>back</p>
                            </div>



                        </form>

                    </div>
                    <div id='add-card-modal-action'>
                        <button id='add-card-modal-affirm' onClick={e => {
                            e.preventDefault();
                            createCard();
                            setAddCardModalOpen(false);
                            setNewCardFront('');
                            setNewCardBack('');
                        }}><FontAwesomeIcon title='Close Delete Card Set Modal' color={'#e8e8e8'} size={'2x'} icon={faCheck} /></button>
                        <button id='add-card-modal-cancel' onClick={e => {
                            setAddCardModalOpen(false);
                            setNewCardFront('');
                            setNewCardBack('');
                        }}><FontAwesomeIcon title='Close Delete Card Set Modal' color={'#e8e8e8'} size={'2x'} icon={faXmark} /></button>
                    </div>
                </div>

            </div>











            <div id='delete-card-modal' className={deleteCardModalOpen === true ? 'open' : ''}>

                <div id='delete-card-modal-window'>

                    <button id='delete-card-modal-close' onClick={e => setDeleteCardModalOpen(false)}>
                    <FontAwesomeIcon title='Close Delete Card Set Modal' color={'#e8e8e8'} size={'2x'} icon={faXmark} />
                    </button>

                    <div id='delete-card-modal-content'>

                        <p>Are you sure you want to delete this card?</p>

                    </div>
                    <div id='delete-card-modal-action'>
                        <button id='delete-card-modal-affirm' onClick={e => {
                            e.preventDefault();
                            console.log('deleting...')
                            setDeleteCardModalOpen(false);
                            deleteCard(displayCard.id).catch(e => console.log(e))
                            //props.refresh()

                        }}>
                            <FontAwesomeIcon title='Close Delete Card Set Modal' color={'#e8e8e8'} size={'1x'} icon={faTrash} /> Delete
                        </button>
                        <button id='delete-card-modal-cancel' onClick={e => {
                            setDeleteCardModalOpen(false);
                            // setName('');
                            // setDescription('');
                        }}>
                            <FontAwesomeIcon title='Close Delete Card Set Modal' color={'#e8e8e8'} size={'1x'} icon={faRotateLeft} /> Go Back
                        </button>
                    </div>
                </div>

            </div>
























            <div id='delete-cardset-modal' className={deleteCardSetModalOpen === true ? 'open' : ''}>

                <div id='delete-cardset-modal-window'>

                    <button id='delete-cardset-modal-close' onClick={e => {
                        e.preventDefault();
                        return setDeleteCardSetModalOpen(false)
                    }}>
                        <FontAwesomeIcon title='Close Delete Card Set Modal' color={'#e8e8e8'} size={'2x'} icon={faXmark} />
                    </button>

                    <div id='delete-cardset-modal-content'>

                        <p>Are you sure you want to delete this card set?</p>

                    </div>
                    <div id='delete-cardset-modal-action'>
                        <button id='delete-cardset-modal-affirm' onClick={e => {
                            e.preventDefault();
                            console.log('deleting...')
                            setDeleteCardSetModalOpen(false);
                            props.delete(props.id).catch(e => console.log(e))
                            props.refresh()
                            // CardSetController
                            //     .delete(props.id)
                            //     .catch(e => console.log(e))
                        }}>
                            <FontAwesomeIcon title='Close Delete Card Set Modal' color={'#e8e8e8'} size={'1x'} icon={faTrash} /> Delete
                        </button>
                        <button id='delete-cardset-modal-cancel' onClick={e => {
                            setDeleteCardSetModalOpen(false);
                            // setName('');
                            // setDescription('');
                        }}>
                            <FontAwesomeIcon title='Close Delete Card Set Modal' color={'#e8e8e8'} size={'1x'} icon={faRotateLeft} /> Go Back
                            </button>
                    </div>
                </div>

            </div>


            <div id='edit-set-modal' className={editSetModalOpen === true ? 'open' : ''}>

                <div id='edit-set-modal-window'>
                    <button id='edit-set-modal-close' onClick={e => setEditSetModalOpen(false)}>
                    <FontAwesomeIcon title='Close Edit Card Set Info Modal' color={'#e8e8e8'} size={'2x'} icon={faXmark} />
                    </button>
                    <div id='edit-set-modal-content'>

                        <form id='editset'>
                            <div className='form-group'>
                                <TextInput label={'name'} value={name} onChange={setName} disabled={false} />
                            </div>
                            <div className='form-group'>
                                {/* <TextInput label={'description'} value={description} onChange={setDescription} disabled={false} /> */}
                                <TextArea label={'description'} value={description} onChange={setDescription} disabled={false} />
                            </div>
                        </form>

                    </div>
                    <div id='edit-set-modal-action'>
                        <button id='edit-set-modal-affirm' onClick={e => {
                            e.preventDefault();
                            props.updateInfo(props.id, name, description)
                            setEditSetModalOpen(false);



                        }}>
                            <FontAwesomeIcon title='Close Edit Card Set Info Modal' color={'#e8e8e8'} size={'3x'} icon={faCheck} />
                        </button>
                        <button id='edit-set-modal-cancel' onClick={e => {
                            setEditSetModalOpen(false);
                            setName(props.name);
                            setDescription(props.description);
                        }}>
                            <FontAwesomeIcon title='Close Edit Card Set Info Modal' color={'#e8e8e8'} size={'3x'} icon={faXmark} />
                        </button>
                    </div>
                </div>

            </div>







        </>
    );
};

export default CardSet;