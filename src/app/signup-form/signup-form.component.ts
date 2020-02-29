import { UsernameValidators } from '../common/validators/username.validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  form = new FormGroup({
    username: new  FormControl('', [
      Validators.required, 
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace
    ]),
    password: new FormControl('', Validators.required)
  })
  constructor() { }

  ngOnInit() {
  }

  get username(){
    return this.form.get('username');
  }

  login(){
    //let isValid = authService.login(this.form.value);
    // Assume login fail
    this.form.setErrors({
      invalidLogin: true
    })
  }
}
