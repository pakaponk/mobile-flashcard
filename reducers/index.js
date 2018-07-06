import { ADD_DECK, RECEIVE_DECKS, ADD_CARD_TO_DECK } from '../actions'

export default decks = (state = {}, action) => {
  switch(action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      }
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_CARD_TO_DECK:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [
            ...state[action.title].questions,
            { 
              question: action.question,
              answer: action.answer
            }
          ]
        } 
      }
    default:
      return state
  }
} 