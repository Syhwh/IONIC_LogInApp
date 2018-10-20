import { Component, OnInit } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {UsersService} from '../../app/services/users.service';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'app-userPage',
  templateUrl: 'userPage.component.html'
})
export class UserPage {

  users:any;
  userData:any;
  userLogin:any;
  idx:number;
  constructor (public navCtrl: NavController,
              public navParams:NavParams,
              public alertCtrl:AlertController,
              public userService:UsersService) {
          
               
                this.users=this.navParams.get('user_full');
                this.userData=this.users.userData[0];
             

  }

  thisisanAlert() {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'This is an alert',
      buttons: ['Dismiss']
    });
    alert.present();
  }  

 logOut() {
  this.navCtrl.push(HomePage);
 }
}