import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() label: string = '¿Qué estás buscando?';
  @Input() placeholder: string = 'Buscar...';
  @Input() value: string = '';

  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.valueChange.emit(inputValue);
  }


}
