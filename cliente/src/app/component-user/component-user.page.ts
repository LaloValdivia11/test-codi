import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-component-user',
  templateUrl: './component-user.page.html',
  styleUrls: ['./component-user.page.scss'],
})
export class ComponentUserPage implements OnInit {
  usuarios: any = [];
  constructor(private http: HttpClient, private storage: Storage, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.getWithToken2("http://localhost:8000/api/all/user");
  }

  async eliminarUsuario(id: any) {
    try {
      const url = `http://localhost:8000/api/user/${id}`
      this.http.delete(url).subscribe((response: any) => {

        if (response.status == 200) {
          this.presentSuccessAlert();
        }
      });
    } catch (error) {
      console.log("Error al eliminar usuario : " + error)
    }
  }

  mostrarModalEditar(id: any) {
    this.router.navigate(['/edit-user'], { queryParams: { userId: id } });
  }


  async getWithToken(url: string) {
    try {
      const token: any = await this.storage.get("token");

      if (!token) {
        console.error("Token is missing or invalid.");
        return;
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      this.http.get(url, { headers: headers }).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  
    } catch (error) {
      console.error('Error while retrieving token or making request:', error);
    }
  }

  async getWithToken2(url: string) {
    try {
      //const token: any = await this.storage.get("token"); // Await token retrieval

      /*** 
      const token = null;
      if (!token) {
        console.error("Token is missing or invalid.");
        return;
      }
      */
  
      /***
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      */
  
      this.http.get(url).subscribe(
        (response: any) => {
          this.usuarios = response.data
        },
        (error) => {
          console.error('Error:', error);
        }
      );


    } catch (error) {
      console.error('Error while retrieving token or making request:', error);
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

  async regresarALogin() {
    await this.router.navigate(['/login']);
  }

  async agregarUsuario(){
    await this.router.navigate(['/register']);
  }


}
