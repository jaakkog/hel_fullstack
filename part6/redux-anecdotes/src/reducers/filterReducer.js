import anecdoteService from '../services/anecdotes'

const filterReducer = (state = initialState, action) => {
    console.log('state', state)
    switch(action.type) {
        case 'FILTER':
        console.log('action data', action.data)
        console.log('state', state)
        return action.data 
        default:
        return state
    }
}

const initialState = ''

export const filter = (content) => {
    console.log('filtteröi')
    return {
        type: 'FILTER',
        data: {
            content
        }
    }
}

export default filterReducer