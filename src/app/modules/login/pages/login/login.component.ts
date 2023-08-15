import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/http/interfaces/user';
import { LoginService } from 'src/app/core/http/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  register: boolean = false;
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private readonly loginService: LoginService, private readonly router: Router ) { 
  }
  login(){
    const user: User = {
      username: this.form.value.username as string,
      password: this.form.value.password as string 
    };
    if(!this.register){
    this.loginService.login(user).subscribe((response: any) =>{
      if(response.key !== undefined) {
        localStorage.setItem('key', response.key)
        this.router.navigate(['/decks'])
        return
     } return alert('Invalid username or password')
    })
  }
  if(this.register){
    this.loginService.register(user).subscribe((response: any) =>{
      localStorage.setItem('key', response.key)
      this.router.navigate(['/decks'])
    })
  }
  }
  toggleRegister(){
    this.register = !this.register;
  }
}
