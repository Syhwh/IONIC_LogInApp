import { Component, OnInit } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {UsersService} from '../../app/services/users.service';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'app-userPage',
  templateUrl: 'userPage.component.html'
})
export class UserPage {
  currentImage: string;
  
  users:any;
  userData:any;
  userLogin:any;
  idx:number;
  constructor (public navCtrl: NavController,
              public navParams:NavParams,
              public alertCtrl:AlertController,
              public userService:UsersService,
              private camera: Camera) {
          
               
                this.users=this.navParams.get('user_full');
                this.userData=this.users.userData[0];
             

  }



  takePicture() {
    const options: CameraOptions = {
      targetWidth: 300, 
      targetHeight: 300,
      quality: 100,
      saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log('Entro camera photo');
    this.currentImage = 'data:image/jpeg;base64,' + imageData;
     

     // let cameraImageSelector = document.getElementById('camera-image');
     // cameraImageSelector.setAttribute('src', this.currentImage);
      console.log('Entro camera photo');
    }, (err) => {
     // Handle error
     console.log("Camera issue:" + err);
    });
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