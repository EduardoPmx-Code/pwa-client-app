import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(

  ) { }

/* questionAlert(title:string, text:string) {
    return Swal.fire(
      title,
      text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    );
  }*/

  errorTimer(text: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
      timer: 2000,
    })
  }

  successTimer(text: string) {
    Swal.fire({
      title: 'Éxito',
      text,
      timer: 1000,
      icon: 'success',
    });
  }

   warningTimer(text: string) {
    Swal.fire({
      title: 'Atención',
      text,
      timer: 2000,
      icon: 'warning',
    });
  }

   infoTimer(text: string, timer: number) {
    Swal.fire({
      title: 'Info',
      text,
      timer,
      icon: 'info',
    });
  }

 warningStatic(text: string) {
    Swal.fire({
      title: 'Atención',
      text,
      icon: 'warning',
    });
  }

   errorStatic(text: string) {
    Swal.fire({
      title: 'Error',
      text,
      icon: 'error',
    });
  }

   infoStatic(text: string) {

    Swal.fire({
      title: 'Info',
      text,
      icon: 'info',
    });
  }


}
