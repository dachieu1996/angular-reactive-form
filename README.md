## Initial Form
Add 
import { FormGroup, FormControl } from '@angular/forms'

Add ReactiveFormsModule in app.module.ts
```js
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
   declarations: [
   ],
   imports: [
      ...
      ReactiveFormsModule
      ...
   ],
})
```
Build form and validation
```js
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
      Validators.minLength(3)
    ]),
    password: new FormControl('', Validators.required)
  })
  constructor() { }

  ngOnInit() {
  }

  get username(){
    return this.form.get('username');
  }
}
```

```html
<form [formGroup]="form">
  <div class="container">
    <div class="form-group">
      <label for="username"><b>User Name</b></label>
      <input formControlName="username" type="text" class="form-control">
      <div *ngIf="username.touched && username.invalid" class="alert alert-danger">
        <div *ngIf="username.errors.required">Username is required</div>
        <div *ngIf="username.errors.minlength">Username should be minimum {{ username.errors.minlength.requiredLength }}</div>
      </div>
    </div>
    <div class="form-group">
      <label for="password"><b>Password</b></label>
      <input formControlName="password" type="password" class="form-control">
    </div>
    <div class="clearfix">
      <button type="submit" class="btn btn-primary">Sign Up</button>
      <button type="button" class="btn btn-danger">Cancel</button>
    </div>
  </div>
</form>
```

## Custom validation
Add app/common/validators/username.validators.ts
```js
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidators{
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null{
        if((control.value as string).indexOf(' ') >= 0)
            return {cannotContainSpace: true}

        return null
    }
}
```

Add validation in form
```js
export class SignupFormComponent implements OnInit {
  form = new FormGroup({
    username: new  FormControl('', [
      Validators.required, 
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace // new validation
    ]),
    password: new FormControl('', Validators.required)
  })
  constructor() { }

  ngOnInit() {
  }

  get username(){
    return this.form.get('username');
  }
}
```

```html
<div *ngIf="username.errors.cannotContainSpace">Username cannot contain space</div>
```

## Form submit
```html
<form [formGroup]="form" (ngSubmit)="login()">
   <div class="container">
    <div *ngIf="form.errors" class="alert alert-danger">Username or password is not valid</div>
...
```

```js
login(){
   //let isValid = authService.login(this.form.value);
   // Assume login fail
   this.form.setErrors({
   invalidLogin: true
   })
```
