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
  const maxBotones = 5;
  const total = this.totalPaginas;
  const actual = this.paginaActual;

  let inicio = Math.max(actual - Math.floor(maxBotones / 2), 1);
  let fin = inicio + maxBotones - 1;

  if (fin > total) {
    fin = total;
    inicio = Math.max(fin - maxBotones + 1, 1);
  }

  const paginas = [];
  for (let i = inicio; i <= fin; i++) {
    paginas.push(i);
  }
  return paginas;
}


}
