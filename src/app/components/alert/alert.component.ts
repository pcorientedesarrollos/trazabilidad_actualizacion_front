import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
   @Input() show ? = false;
  @Input() title? = 'Confirm';
  @Input() message ?= 'Are you sure you want to proceed?';
  @Input() confirmText? = 'Yes';
  @Input() cancelText ? = 'Cancel';
  @Input() icon?: string = 'Warning';
  @Input() iconColor: string = '';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  close() {
    this.cancel.emit();
  }

  confirmAction() {
    this.confirm.emit();
  }

}
