import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mtgO2';
  constructor(private readonly router: Router){}

   ngOnInit(){
    if(!localStorage.getItem('key')){
      this.router.navigate(['/login'])
    }
  }
}
