import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  imports: [CommonModule],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  @Input() paginaActual: number = 1;
  @Input() totalPaginas: number = 1;

  @Output() cambiarPagina = new EventEmitter<number>();

  irPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas && pagina !== this.paginaActual) {
      this.cambiarPagina.emit(pagina);
    }
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }


}
