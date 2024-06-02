import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";

  constructor(private router: Router, private http: HttpClient, private storage: Storage,  private alertController: AlertController) { }

  ngOnInit() {
    this.storage.create();
  }

  login() {
    try{
      const jsonData = {
        'email' : this.email,
        'password' : this.password
      };
    
      const apiLogin = 'http://localhost:8000/api/login';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      this.http.post(apiLogin, jsonData).subscribe(
        (response : any) => {
          if(response.status == 200){
            this.storage.set('token', response.token);
            this.router.navigate(['/component-user']);
          }
          if(response.status == 401){
            this.presentExistAlert();
          }
          if(response.status == 403){
            this.presentFailureAlert();
          }
        },
        (error) => {
          // Handle error response here
          console.error('Error:', error);
        }
      );
    }
    catch(error){
      console.log('Error al loggearse');
    }
    
  }

  async presentFailureAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Hubo un error.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentExistAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No existe el correo.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
