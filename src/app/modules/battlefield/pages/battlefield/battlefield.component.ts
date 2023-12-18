import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/core/http/interfaces/card';
import { GameService } from 'src/app/core/http/services/game.service';
import { WebsocketsService } from 'src/app/core/http/services/websockets.service';
import { MenuItem, MessageService } from 'primeng/api';

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
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Bookmark',
                                icon: 'pi pi-fw pi-bookmark'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-fw pi-video'
                            }
                        ]
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-trash'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-fw pi-external-link'
                    }
                ]
            },
            {
                label: 'Move To',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Battlefield',
                        command: (event) => this.handleContextMenu(event, 'battlefield'),
                        icon: 'pi pi-fw pi-align-left'
                    },
                    {
                        label: 'Graveyard',
                        command: (event) => this.handleContextMenu(event, 'graveyard'),
                        icon: 'pi pi-fw pi-align-left'
                    },
                    {
                        label: 'Exile',
                        icon: 'pi pi-fw pi-align-right'
                    },
                    {
                        label: 'Command zone',
                        icon: 'pi pi-fw pi-align-center'
                    },
                    {
                        label: 'Hand',
                        icon: 'pi pi-fw pi-align-justify'
                    }
                ]
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Events',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Save',
                                icon: 'pi pi-fw pi-calendar-plus'
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    },
                    {
                        label: 'Archieve',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Remove',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    }
                ]
            },
            {
                separator: true
            },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-power-off'
            }
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

  handleShow(event: any) {
        console.log(event)
    }
  handleContextMenu(event: any, option: string): void {
  console.log('Selected:', option);
  const clickedItem = event.originalEvent.target; // Get the HTML element clicked on

  // Find the card associated with the clicked context menu
  const parentCard = clickedItem.closest('.example-box');
  const cardIndex = Array.from(parentCard.parentElement.children).indexOf(parentCard);
  const clickedCard = this.battlefield[cardIndex];

  console.log('Clicked card:', clickedCard);
  // Move the clicked card to the graveyard
  switch (option) {
    case 'battlefield':
      this.moveTo('battlefield', clickedCard);
      break;
    case 'graveyard':
      this.moveTo('graveyard', clickedCard);
      break;
    case 'exile':
      this.moveTo('exile', clickedCard);
      break;
  }
}


  selectOption(option: string): void {
    console.log('Selected:', option);
    // Additional action when an option is selected
  }
}
