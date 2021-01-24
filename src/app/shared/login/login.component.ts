import { Component, OnInit } from '@angular/core';
import {Credentials} from '../../model/Credentials';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: Credentials = new Credentials('', '');

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  login() {
      this.authService.login(this.credentials);
  }
}
