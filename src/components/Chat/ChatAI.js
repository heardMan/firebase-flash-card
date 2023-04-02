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

export default ai;