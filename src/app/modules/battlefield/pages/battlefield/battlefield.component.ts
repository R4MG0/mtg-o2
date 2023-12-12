import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/core/http/interfaces/card';
import { GameService } from 'src/app/core/http/services/game.service';
import { WebsocketsService } from 'src/app/core/http/services/websockets.service';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent implements OnInit {
  user = {
    userkey: '',
    code: '',
    activeDeckName: '',
    userName: '',
    joinedSession: false
  }
  cardsPlayer1: Card[] = [];
  amountOfEnemyCards = 0;

  receivedMessages: string[] = [];

  battlefield : Card[] = [];
  graveyard: Card[] = []

  items: MenuItem[] | undefined;



  constructor(private readonly route: ActivatedRoute, private readonly gameService: GameService, private readonly wsService: WebsocketsService) {
  }


  ngOnInit() {
    this.user.code = this.route.snapshot.paramMap.get('code') as string;
    this.user.userkey = localStorage.getItem('key') as string
    this.user.activeDeckName = localStorage.getItem('activeDeck') as string
    this.user.userName = localStorage.getItem('username') as string
    this.user.joinedSession = localStorage.getItem('joinedSession') === 'true' ? true : false

    this.drawXCards(7);

    if (this.user.joinedSession) {
      this.amountOfEnemyCards = 7
    }

    this.wsService.connect(this.user.code);
    this.wsService.onMessage().subscribe((message: any) => {
      this.receivedMessages.push(message);
      let username = message.split(':')[0]
      let action = message.split(':')[1]
      let amount = message.split(':')[2]
      if (username !== this.user.userName) {
        console.log(username, action, amount)
        if (action === 'draw') {
          this.amountOfEnemyCards += parseInt(amount)
        }
      }
        // this.amountOfEnemyCards += 1
    });
    this.items = [
            { label: 'View', icon: 'pi pi-fw pi-search' },
            { label: 'Delete', icon: 'pi pi-fw pi-trash' }
        ];


    // console.log(this.wsService.socket.readyState, 'airsentioarsntio')
    // if (this.wsService.socket.readyState) {
    //   this.sendMessage();
    // }
  }
  drawXCards(x: number) {
    this.gameService.drawCards(this.user.userkey, this.user.activeDeckName, this.user.code, x).subscribe((response: any) => {
      for (let i = 0; i < response.cards.length; i++) {
        this.cardsPlayer1.push(response.cards[i])
      }
    })
  }


   sendMessage(): void {
    const message = `${this.user.code}`;
    this.wsService.sendMessage(message);
  }

  moveTo(field: string, card: Card) {
    if (field === 'battlefield') {
      this.battlefield.push(card)
      this.cardsPlayer1.splice(this.cardsPlayer1.indexOf(card), 1)
    }
    if (field === 'graveyard') {
      this.graveyard.push(card)
      this.battlefield.splice(this.battlefield.indexOf(card), 1)
    }
  }
}
