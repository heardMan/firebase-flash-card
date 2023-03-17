import React, { useEffect, useState } from 'react';
import CardSetController from '../../controllers/CardSet.js';
import { useAuth } from '../../contexts/Auth.js';
import TextInput from '../TextInput/TextInput.js';
import CardSet from '../CardSet/CardSet.js';
import TextArea from '../TextArea/TextArea';

import './CardSetManager.css';

const CardSetManager = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [addSetModalOpen, setAddSetModalOpen] = useState(false);

    const { authUser } = useAuth();

    const [cardSets, setCardSets] = useState([]);

    const deleteCardSet = id => {
        const newCardSet = cardSets.filter((elem) => { return elem.id !== id })
        CardSetController.delete(id);
        return setCardSets(newCardSet)
    }

    const updateCardSetInfo = (id, name, desc) => {
        CardSetController
            .update(id, { 'uid': authUser.auth.uid, 'name': name, 'description': desc })
            .then(() => {
                CardSetController
                    .getAllByUID(authUser.auth.uid)
                    .then(data => setCardSets(data))
                    .catch(e => console.log(e));

            })
            .catch(e => console.log(e));
    }

    const refreshCardSetInfo = () => {

        return CardSetController
            .getAllByUID(authUser.auth.uid)
            .then(data => setCardSets(data))
            .catch(e => console.log(e));
    }

    useEffect(() => {

        if (authUser.auth !== undefined) {

            CardSetController
                .getAllByUID(authUser.auth.uid)
                .then(data => setCardSets(data))
                .catch(e => console.log(e));
        }

    }, [authUser.auth])

    return (
        <>
            <div id='card-set-manager'>
                {console.log(cardSets)}
                <div id='add-set'>

                    <button
                        id='open-add-set'
                        onClick={
                            e => addSetModalOpen === false ?
                                setAddSetModalOpen(true)
                                :
                                setAddSetModalOpen(false)
                        }
                    >
                        New Card Set +
                    </button>




                </div>




                <div className='card-set-list'>
                    <ul>
                        {
                            cardSets === undefined || cardSets.length === 0 ?
                                <li>
                                    <div >
                                        <p>You don't have any Card Sets yet.</p>

                                    </div>
                                </li>
                                :

                                cardSets.map((cardset, i) => {

                                    return (
                                        <li key={i}>

                                            <CardSet
                                                id={(cardset.id)}
                                                name={(cardset.name)}
                                                description={(cardset.description)}
                                                //cards={(cardset.cards)}
                                                updateInfo={updateCardSetInfo}
                                                delete={deleteCardSet}
                                            />



                                        </li>
                                    )
                                })

                        }
                    </ul>
                </div>





            </div>







            <div id='add-set-modal' className={addSetModalOpen === true ? 'open' : ''}>

                <div id='add-set-modal-window'>
                    <button id='add-set-modal-close' onClick={e => setAddSetModalOpen(false)}>x</button>
                    <div id='add-set-modal-content'>

                        <form id='addset'>
                            <div className='form-group'>
                                <TextInput label={'name'} value={name} onChange={setName} disabled={false} />
                            </div>
                            <div className='form-group'>
                                {/* <TextInput label={'description'} value={description} onChange={setDescription} disabled={false} /> */}
                                <TextArea label={'description'} value={description} onChange={setDescription} disabled={false} />
                            </div>
                        </form>

                    </div>
                    <div id='add-set-modal-action'>
                        <button id='add-set-modal-affirm' onClick={e => {
                            e.preventDefault();
                            CardSetController
                                .create(authUser.auth.uid, name, description)
                                .then(() => {
                                    setName('');
                                    setDescription('');
                                    CardSetController
                                        .getAllByUID(authUser.auth.uid)
                                        .then(data => {
                                            setCardSets(data);
                                            setAddSetModalOpen(false);
                                        })
                                        .catch(e => console.log(e));

                                })
                                .catch(e => console.log(e))
                        }}>Create Set</button>
                        <button id='add-set-modal-cancel' onClick={e => {
                            setAddSetModalOpen(false);
                            setName('');
                            setDescription('');
                        }}>Cancel</button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default CardSetManager;