
const notificationReducer = (state=[], action) => {
    switch(action.type) {
        case 'NEW':
            console.log('action data', action.data)
            if (action.data.content !== '')
            return [action.data.content]
            else return ''
        case 'VOTED':
            console.log('action.data', action.data.content)
            if (action.data.content !== '')
            return action.data.content.content
            else return ''
        default:
            return state
    }
}

export const newAnecdoteNotification = (content) => {
    console.log('lisääminen toimii')
    return {
        type: 'NEW',
        data: {
            content
        },
    }
}

export const votedNotification = (content) => {
    console.log('notificaation')
    console.log('content', content)
        return {
        type: 'VOTED',
        data: {
            content
        }
    }
}


export default notificationReducer