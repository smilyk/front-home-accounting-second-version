import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RegistrationService} from '../../services/registration.service';
import {RegisterUser} from '../../model/RegisterUser';
import {Redirect} from '../../model/Redirect';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegistrationService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  registerUser(form: NgForm) {
    const registerUser = form.value as RegisterUser;
    const userCredentials = {
        email: registerUser.email,
        password: registerUser.password,
        firstName: registerUser.firstName,
        lastName: registerUser.lastName
    };
    this.registerService.registerUser(userCredentials).subscribe();
    this.cancel();
  }

  cancel() {
    this.router.navigate([Redirect.HOME]);
  }
}
