import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deck } from '../interfaces/deck';
import { Key } from '../interfaces/key';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecksService {

constructor(private readonly http: HttpClient) { }
  generateDeck(deck: Deck, key: string){
    const deckWithKey = {
      ...deck, key: key
    }
    return this.http.post('http://localhost:5000/create_deck', deckWithKey)
  }

  getDecks(key: Key){
    const hello = [{
      deckname: 'test',
      deckimage: 'https://cards.scryfall.io/large/front/f/7/f7226de1-0e05-4baf-8c2f-54297fee43c1.jpg?1562566877',
    },{
      deckname: 'test2',
      deckimage: 'https://cards.scryfall.io/large/front/f/7/f7226de1-0e05-4baf-8c2f-54297fee43c1.jpg?1562566877',
    },{
      deckname: 'test3',
      deckimage: 'https://cards.scryfall.io/large/front/f/7/f7226de1-0e05-4baf-8c2f-54297fee43c1.jpg?1562566877',
    },{
      deckname: 'test4',
      deckimage: 'https://cards.scryfall.io/large/front/f/7/f7226de1-0e05-4baf-8c2f-54297fee43c1.jpg?1562566877',
    },{
      deckname: 'test5',
      deckimage: 'https://cards.scryfall.io/large/front/f/7/f7226de1-0e05-4baf-8c2f-54297fee43c1.jpg?1562566877',
    }]
    return this.http.post(`http://127.0.0.1:5000/get_decks`, key)
    // return of({message: hello})
  }
  createSession(deck: string, key: string){
    return this.http.post('http://localhost:5000/create_session', {deck, key})
  }
}
