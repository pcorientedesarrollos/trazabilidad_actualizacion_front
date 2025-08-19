import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
    @Input() label?: string = 'Botón';
  @Input() labelColor?: string = 'text-gray-700';
  @Input() icon?: string; 
  @Input() bgColor?: string = 'bg-green-600';
  @Input() hoverColor?: string = 'hover:bg-green-700';
  @Input() size?: 'sm' | 'md' | 'lg' = 'md';
  @Input() title?: string;
@Input() iconColor?: string = 'text-white'; 
@Input() font?: string = 'font-semibold';




  @Input() type?: 'button' | 'submit' | 'reset' = 'button';
  @Output() clicked = new EventEmitter<void>();


    get sizeClasses() {
    switch (this.size) {
      case 'sm': return 'text-sm px-3 py-1';
      case 'lg': return 'text-lg px-6 py-3';
      default: return 'text-base px-4 py-2';
    }
  }


}
