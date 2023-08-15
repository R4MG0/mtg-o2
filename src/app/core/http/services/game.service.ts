import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

constructor(private readonly http: HttpClient) { }

    drawCards(userkey: string, deckname: string, gameCode: string, amount: number) {
      return this.http.post(`http://localhost:5000/draw`, {key: userkey, deck: deckname, code: gameCode, amount })
    }
}
