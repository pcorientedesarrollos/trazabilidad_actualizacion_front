import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
    @Input() label: string = 'Botón';
  @Input() icon?: string; // Nombre del ícono de Material Symbols
  @Input() bgColor: string = 'bg-green-600';
  @Input() hoverColor: string = 'hover:bg-green-700';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() clicked = new EventEmitter<void>();


    get sizeClasses() {
    switch (this.size) {
      case 'sm': return 'text-sm px-3 py-1';
      case 'lg': return 'text-lg px-6 py-3';
      default: return 'text-base px-4 py-2';
    }
  }


}
