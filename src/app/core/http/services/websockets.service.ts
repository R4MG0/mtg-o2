import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

public socket!: WebSocket;
private connected =false

  constructor() { }

  connect(code: string): void {
    this.socket = new WebSocket('ws://localhost:5678');

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
      this.sendMessage(code);
    };

    this.socket.onmessage = (event) => {
      console.log('Received message:', event.data);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    // if(this.socket.readyState === WebSocket.OPEN) {
    //   this.connected = true
    // }
    // console.log(this.socket.readyState, '12234')
  }

  sendMessage(message: string): void {
    this.socket.send(message);
  }

  closeConnection(): void {
    this.socket.close();
  }

  // onMessage() {
  //   return
  // }

  // recieve Message from Websocket server
  onMessage(): Rx.Subject<MessageEvent> {
    let observable = new Rx.Observable(observer => {
      this.socket.onmessage = (event) => {
        // console.log('Received message:', event.data);
        observer.next(event.data);
      }
    });
    let observer = {
      next: (data: Object) => {
        if (this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify(data));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }

}
