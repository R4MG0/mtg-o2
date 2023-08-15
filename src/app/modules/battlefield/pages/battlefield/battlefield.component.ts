import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/core/http/interfaces/card';
import { GameService } from 'src/app/core/http/services/game.service';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent implements OnInit {
  user = {
    userkey: '',
    code: '',
    activeDeckName: ''
  }
  cardsPlayer1: Card[] = [];

  constructor(private readonly route: ActivatedRoute, private readonly gameService: GameService) { }

  ngOnInit() {
    this.user.code = this.route.snapshot.paramMap.get('code') as string;
    this.user.userkey = localStorage.getItem('key') as string 
    this.user.activeDeckName = localStorage.getItem('activeDeck') as string
    this.gameService.drawCards(this.user.userkey, this.user.activeDeckName, this.user.code, 7).subscribe((response: any) => {
      this.cardsPlayer1 = response.cards
    })
  }
}
