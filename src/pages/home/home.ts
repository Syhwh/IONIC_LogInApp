import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import  {UserPage} from '../userPage/userPage.component';
import {RegisterComponent} from '../register/register.component';
import {FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import {UsersService} from '../../app/services/users.service';
import { NodeData } from '@angular/core/src/view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userForm:FormGroup;
  userName:AbstractControl;
  password:AbstractControl;
  constructor(public navCtrl: NavController,
              public navParams:NavParams,
              public alertCtrl: AlertController,
              public _formBuilder:FormBuilder,
              public userService:UsersService,              
              ) {
                this.userForm =_formBuilder.group({
                  userName: ['', Validators.compose([
                    Validators.maxLength(25),
                    Validators.minLength(5),
                    Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
                    Validators.required])],
                    
                   password: ['', Validators.compose([ 
                     Validators.required, 
                     Validators.minLength(4)])]
                });
                this.userName=this.userForm.controls['userName'];
                this.password=this.userForm.controls['password'];
  }
users:any;
username:string;
userpassword:string;
  goUserPage(){
    
    console.log('entro a user page');
 
    this.verifyUser(this.username,this.userpassword)
   // this.navCtrl.push(UserPage);
  }

  goRegister(){
    this.navCtrl.push(RegisterComponent);
  }

  verifyUser(user:string, pass:string){
    let users=this.userService.loadData();
    console.log('esto es users',users);
    
  if (users.length>0){
    for (let i=0; i<users.length; i++){
              if (user==users[i].userName && pass==users[i].userData[0].password){
                let user_full=users[i]
                this.navCtrl.push(UserPage,{user_full});
                break;
              }
              else{
                this.notregistered() 
              break;
      }
    }
  }else{
this.noDataRegistered()
  }
  }

  notregistered() {
  let alert = this.alertCtrl.create({
    title: 'Alert',
    subTitle: 'The user or password are wrong',
    buttons: ['Dismiss']
  });
  alert.present();

}


  noDataRegistered() {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'There is no data',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  



validation_messages = {
  'userName': [
    { type: 'required', message: 'Username is required.' },
    { type: 'minlength', message: 'Username must be at least 5 characters long.' },
    { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
    { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
    // { type: 'validUsername', message: 'Your username has already been taken.' }
  ],
    'password': [
    { type: 'required', message: 'Password is required.' },
    { type: 'minlength', message: 'Password must be at least 5 characters long.' },
    { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
  ]
};

}

