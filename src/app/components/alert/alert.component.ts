import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  showAlert() {
    Swal.fire({
      title: '¡Alerta!',
      text: 'Este es un mensaje de SweetAlert2.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
}
