import { Component, OnInit } from '@angular/core';
import { Deck } from 'src/app/core/http/interfaces/deck';
import { Key } from 'src/app/core/http/interfaces/key';
import { DecksService } from 'src/app/core/http/services/decks.service';
import { DialogContentExampleComponent } from '../../components/DialogContentExample/DialogContentExample.component';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent implements OnInit {
  userKey = { key : localStorage.getItem('key')}
  decks: Deck[] = [];
  showJoinField = false;
  joinNumber = new FormControl('');
  constructor(private readonly deckService: DecksService, private readonly router: Router) { }

  ngOnInit(): void {
    this.deckService.getDecks(this.userKey as Key).subscribe((response: any) => {
      this.decks = response.message
    })
    localStorage.removeItem('gameCode')
    localStorage.removeItem('activeDeck')
  }
  goToCreateDeck() {
    this.router.navigate(['/decks/create'])
  }
  createNewSession(deck: Deck) {
    console.log(deck)
    this.deckService.createSession(deck.deckname, this.userKey.key as string).subscribe((response: any) => {
      localStorage.setItem('activeDeck', deck.deckname)
      localStorage.setItem('gameCode', response.code)
      localStorage.setItem('joinedSession', 'false')
      this.router.navigate([`/battlefield/${response.code}`])
    })
  }
  joinNewSession(deck: Deck) {
    this.showJoinField = true;
    this.deckService.joinSession(deck.deckname, this.userKey.key as string, this.joinNumber.value as string).subscribe((response: any) => {
      localStorage.setItem('activeDeck', deck.deckname)
      localStorage.setItem('gameCode', this.joinNumber.value as string)
      localStorage.setItem('joinedSession', 'true')
      this.router.navigate([`/battlefield/${this.joinNumber.value}`])
    })
  }
}
