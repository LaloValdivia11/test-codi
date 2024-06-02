import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  userId: any;
  userData: any = {
    name: '',
    paternalSurname: '',
    maternalSurname: '',
    phoneNumber: '',
    address: '',
    password: '',
    password_confirmation: '',
    email: ''
  };


  constructor(private route: ActivatedRoute, private http: HttpClient, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      console.log(this.userId);
    });
  }

  guardarCambios() {
    try {
      const url = `http://localhost:8000/api/user/${this.userId}`

      this.http.put(url, this.userData).subscribe(
        (response: any) => {
          console.log(response);
          if (response.status === 200) {
            this.presentSuccessAlert();
          }

          if (response.status == 403) {
            this.presentFauilureAlert();
          }
        },
        (error) => {
          // Handle error response here
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.log('Error al guardar cambios :', error)
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


  async presentFauilureAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Las contraseñas deben ser iguales.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async regresarALogin() {
    await this.router.navigate(['/component-user']);
  }
}
