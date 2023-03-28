import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faHouse, faLayerGroup, faUser, faQuestion, faRightFromBracket, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TextArea from '../TextArea/TextArea';
import ConversationController from '../../controllers/Conversation.js';
import MessageController from '../../controllers/Message.js';

import './Chat.css';

const Chat = props => {

    const [open, setOpen] = useState(props.open);


    const [convoID, setConvoID] = useState('');
    const [convo, setConvo] = useState(
        [

        ]
    );

    const [msg, setMsg] = useState('');

    const chatRef = useRef(null);

    const scrollToBottom = () => {
        chatRef.current.scrollIntoView({ behavior: "smooth" })
      }

    const sendMessage = () => {
        const newMsg = {
            userID: (props.user),
            convoID: convoID,
            msg: msg
        }

        setMsg('')

        console.log(newMsg)

        MessageController
            .create(convoID, props.user, msg)
            .then(data => {
                console.log('new msg')
                console.log(data)

                MessageController
                    .getAllByConversationID(convoID)
                    .then(data => {
                        console.log('msg data')
                        console.log(data)
                        setConvo(data)
                        scrollToBottom()

                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

    }

    const ai = conversation => {

        let response;

        if (conversation.length === 0) {
            response = 'Welcome, I am Quick Card\'s Chat Bot, how can I help you?'
        }

        if (conversation.length > 1) {
            response = 'I will take note of that!'
        }

        return response;
    }


    useEffect(() => {



        console.log('open for chatting')
        console.log(props)

        if (props.open === true && convoID === '') {
            console.log('No conversation found.');

            ConversationController.create(props.user).then(data => {
                console.log('data')
                console.log(data)
                setConvoID(data)

                return MessageController
                    .create(data, 'app', 'Welcome to Quick Chat, how can I help you?')
                    .then(data => {
                        console.log('new msg')
                        console.log(data)

                        MessageController
                            .getAllByConversationID(data.convoID)
                            .then(data => {
                                console.log('convo data')
                                console.log(data)
                                setConvo(data)
                                scrollToBottom()

                            }).catch(err => console.log(err))

                    }).catch(err => console.log(err))

            }).catch(err => console.log(err))

        }



        if (convo.length % 2 === 0) {

            const response = ai(convo);

            console.log('your turn')

            MessageController
                .create(convoID, 'app', response)
                .then(data => {
                    console.log('new msg')
                    console.log(data)

                    MessageController
                        .getAllByConversationID(data.convoID)
                        .then(data => {
                            console.log('convo data')
                            console.log(data)
                            setConvo(data)
                            

                        }).catch(err => console.log(err))

                }).catch(err => console.log(err))
        }



        scrollToBottom()






    }, [props.open, convo.length])

    return (
        <div id='chat' className={props.open === true ? 'open' : ''}>

            <div id='chat-window'>
                <button id='chat-close' onClick={e => {
                    document.body.style.overflow = 'unset';
                    props.setOpen(false)
                    setConvoID('')
                    setConvo([])

                }}><FontAwesomeIcon title='Close Add Set Modal' color={'#e8e8e8'} size={'2x'} icon={faXmark} /></button>
                <div id='chat-content'>
                    <div className='convo'>

                        {
                            convo.map((chatMsg, key) => {

                                //console.log(chatMsg)

                                let msgSource = 'app';
                                if (chatMsg.userID !== 'app') {
                                    msgSource = 'user'
                                }

                                return (
                                    <div
                                        key={key}
                                        className='chat-msg-container'

                                    >
                                        <div className={`chat-msg ${msgSource}`}>{chatMsg.msg}</div>
                                        <div></div>

                                    </div>
                                )

                            })
                        }
                        <div id='chatRef' ref={chatRef}></div>

                    </div>
                    {/* <TextArea label={''} value={msg} onChange={setMsg} disabled={false} /> */}

                    <div className='msg-container'>

                        <textarea
                            value={msg}
                            onChange={e => setMsg(e.target.value)}
                            placeholder='type your message'

                            rows={1}
                            columns={4}
                        ></textarea>



                    </div>
                    <div className='chat-action'>
                        <button
                            id='sendMsg'
                            onClick={sendMessage}
                        >
                            Send Message <FontAwesomeIcon title='Send Message' color={'#e8e8e8'} size={'1x'} icon={faPaperPlane} />
                        </button>

                        <button
                            id='leaveChat'
                            onClick={e => {
                                e.preventDefault()
                                document.body.style.overflow = 'unset';
                                props.setOpen(false)
                                setConvoID('')
                                setConvo([])
                            }}
                        >
                            Leave Chat <FontAwesomeIcon title='Leave Caht' color={'#e8e8e8'} size={'1x'} icon={faRightFromBracket} />
                        </button>

                    </div>





                </div>





            </div>

        </div>
    );
};

export default Chat;