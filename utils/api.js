import { AsyncStorage } from 'react-native'
import { createEmptyDeck } from './helpers';

const STORAGE_KEY = 'UdaciCard:storage'

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(results => results === null ? {} : JSON.parse(results))
}

export function getDeck(title) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(results => results === null ? {} : JSON.parse(results))
    .then(decks => decks[title])
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]: createEmptyDeck(title)
  }))
}

export function addCardToDeck(title, { question, answer }) {
  return getDeck(title)
    .then((deck) => AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [title]: {
        ...deck,
        questions: [
          ...deck.questions,
          { question, answer }
        ]
      }
    })))
}