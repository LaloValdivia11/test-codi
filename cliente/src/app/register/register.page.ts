import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userData = {
    name: '',
    paternalSurname: '',
    maternalSurname: '',
    phoneNumber: '',
    address: '',
    password: '',
    password_confirmation: '',
    email: ''
  };

  constructor(private http: HttpClient, private alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
  }

  onSubmit() {
    try {
      const url = `http://localhost:8000/api/register`;

      this.http.post(url, this.userData).subscribe(
        (response: any) => {
          console.log(response);
          if (response.status === 200) {
            this.presentSuccessAlert();
          }
        },
        (error) => {
          // Handle error response here
          console.error('Error:', error);
        }
      );

    } catch (error) {
      console.log("Error al registrar usuario " + error);
    }
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'La operación se realizó correctamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async goBack(){
    await this.navCtrl.back();
  }


}
