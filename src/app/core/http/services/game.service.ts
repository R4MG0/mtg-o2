import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebsocketsService } from './websockets.service';
import { map } from 'rxjs/operators';


export interface Message {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public message!: Subject<Message>;

constructor(private readonly http: HttpClient, private readonly wsService: WebsocketsService) {
}

    drawCards(userkey: string, deckname: string, gameCode: string, amount: number) {
      return this.http.post(`http://localhost:5000/draw`, {key: userkey, deck: deckname, code: gameCode, amount })
    }

}
