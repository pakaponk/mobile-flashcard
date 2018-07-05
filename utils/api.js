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
  return AsyncStorage.mergeItem(STORAGE_KEY, {
    [title]: createEmptyDeck(title)
  })
}

export function addCardToDeck(title, { question, answer }) {
  return AsyncStorage.mergeItem(STORAGE_KEY, {
    [title]: {
      title,
      questions: [
        { question, answer }
      ]
    }
  })
}