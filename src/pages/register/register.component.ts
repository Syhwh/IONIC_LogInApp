import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserPage} from '../userPage/userPage.component';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidator } from '../../app/validators/name.validator';
import { PasswordValidator } from '../../app/validators/password.validator';
import {User,Users} from '../../app/class/index';
import {UsersService} from '../../app/services/users.service'


@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html'}
)

export class RegisterComponent {
    validations_form: FormGroup;
    matching_passwords_group: FormGroup;
    genders: Array<string>;
    constructor(public navCtrl: NavController, public formBuilder: FormBuilder,private userService:UsersService) { }
    
    ionViewWillLoad() {
   
              
          this.matching_passwords_group = new FormGroup({
            password: new FormControl('', Validators.compose([
              Validators.minLength(2),
              Validators.required,
              Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
            ])),
            confirm_password: new FormControl('', Validators.required)
          }, (formGroup: FormGroup) => {
            return PasswordValidator.areEqual(formGroup);
          });
      
          this.validations_form = this.formBuilder.group({
            username: new FormControl('', Validators.compose([
            //  UsernameValidator.validUsername,
              Validators.maxLength(25),
              Validators.minLength(2),
              Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
              Validators.required
            ])),
            name: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            
            matching_passwords: this.matching_passwords_group,
            terms: new FormControl(true, Validators.pattern('true'))
          });
          }
 // validations message start        
validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };
// validation message end
userName:string;
Name:string;
LastName:string;
Email:string;
userPassword:string;
user_sub:User[]=[];

addUser(){

let user = new User();
  user.name=this.Name;
  user.lastname=this.LastName;
  user.email=this.Email;
  user.password=this.userPassword;

  this.user_sub.push(user);
  console.log(this.user_sub);


let user_full = new Users (this.userName);
user_full.userData= this.user_sub;
this.userService.addData(user_full);
//let dataLen=this.userService.loadData().length;
//console.log('esto es long',dataLen);
this.navCtrl.push(UserPage,{user_full});

}


    }
