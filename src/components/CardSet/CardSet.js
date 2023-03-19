import React, { useEffect, useState } from 'react';
// import Accordion from '../Accordion/Accordion';
import TextInput from '../TextInput/TextInput';
import TextArea from '../TextArea/TextArea';
import Card from '../Card/Card'
// import edit from './edit.svg';
import CardController from '../../controllers/Card.js';
import chevron from './chevron_left.svg'
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
                            Add New Card +
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
                            Edit Card Set
                        </button>

                    </div>

                    {/* control button */}
                    <button className='accordion-toggle' onClick={e => { open === false ? setOpen(true) : setOpen(false) }}>
                        <img alt='toggle icon' className={`accordion-toggle-icon ${open === true ? 'accordion-toggle-open' : ''}`} src={chevron} />
                    </button>



                    <div className='cards'>

                        <div className='accordion'>
                            {/* title element */}
                            <div className='accordion-title'>
                            </div>
                            {/* content element */}
                            <div className={`accordion-content ${open === true ? 'accordion-open' : ''}`}>


                                {
                                    cards === undefined || cards.length < 0
                                        ?
                                        <p>No cards yet</p>
                                        :
                                        <div className='cardList'>
                                            {/* {cards.map((card, i) =>

                                                <Card
                                                id={displayCard.id}
                                                front={displayCard.front}
                                                back={displayCard.back}
                                                update={updateCard}
                                                delete={deleteCard}
                                                idx={cards.indexOf(displayCard)}
                                                cardCount={cards.length}
                                                next={nextCard}
                                                last={lastCard} />

                                            )} */}



                                            <Card
                                                // id={displayCard.id}
                                                // front={displayCard.front}
                                                // back={displayCard.back}
                                                displayCard={displayCard}
                                                update={updateCard}
                                                delete={deleteCard}
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

                    <button className='delete-card-set' onClick={() => setDeleteCardSetModalOpen(true)}>delete</button>

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
                                <p className='switch-back'>back</p>
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
                        }}>Save</button>
                        <button id='add-card-modal-cancel' onClick={e => {
                            setAddCardModalOpen(false);
                            setNewCardFront('');
                            setNewCardBack('');
                        }}>Cancel</button>
                    </div>
                </div>

            </div>




            <div id='delete-cardset-modal' className={deleteCardSetModalOpen === true ? 'open' : ''}>

                <div id='delete-cardset-modal-window'>

                    <button id='delete-cardset-modal-close' onClick={e => {
                        e.preventDefault();
                        return setDeleteCardSetModalOpen(false)
                    }}>x</button>

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
                        }}>Delete</button>
                        <button id='delete-cardset-modal-cancel' onClick={e => {
                            setDeleteCardSetModalOpen(false);
                            // setName('');
                            // setDescription('');
                        }}>Go Back</button>
                    </div>
                </div>

            </div>


            <div id='edit-set-modal' className={editSetModalOpen === true ? 'open' : ''}>

                <div id='edit-set-modal-window'>
                    <button id='edit-set-modal-close' onClick={e => setEditSetModalOpen(false)}>x</button>
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



                        }}>Update Set</button>
                        <button id='edit-set-modal-cancel' onClick={e => {
                            setEditSetModalOpen(false);
                            setName(props.name);
                            setDescription(props.description);
                        }}>Cancel</button>
                    </div>
                </div>

            </div>







        </>
    );
};

export default CardSet;