import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Deck } from 'src/app/core/http/interfaces/deck';
import { Key } from 'src/app/core/http/interfaces/key';
import { DecksService } from 'src/app/core/http/services/decks.service';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css']
})
export class CreateDeckComponent implements OnInit {
  form = new FormGroup({
    deckname: new FormControl('', [Validators.required]),
    decklist: new FormControl('', [Validators.required]),
  });
  userKey = localStorage.getItem('key')
  constructor( private readonly router: Router, private readonly deckService: DecksService) { }

  ngOnInit() {
  }

  createDeck() {
    if (this.form.valid) {
    const tmpDeck = {
      deckname: this.form.value.deckname,
      decklist: this.form.value.decklist
    }
    this.deckService.generateDeck(tmpDeck as Deck, this.userKey as string).subscribe((response: any) => {
      if(response.message === 'success'){
        this.router.navigate(['/decks'])
      }
    })}
  }
  
  cancel() {
    this.form.reset();
    this.router.navigate(['/decks'])
  }

}
