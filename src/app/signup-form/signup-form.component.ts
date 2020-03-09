import { UsernameValidators } from '../common/validators/username.validators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  
  form: any;
  img: File;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [
        Validators.required, 
        Validators.minLength(3),
        UsernameValidators.cannotContainSpace
      ]],
      password: ['', Validators.required],
      image: ['']
    })
  }

  get username(){
    return this.form.get('username');
  }

  imageProgress(file:any){
    this.img = <File> file.target.files[0];
    console.log(this.img)
  }

  login(){
    //let isValid = authService.login(this.form.value);
    // Assume login fail
    // this.form.setErrors({
    //   invalidLogin: true
    // })
    this.img = <File> this.form.get('image')
    console.log(this.img)
  }
}
