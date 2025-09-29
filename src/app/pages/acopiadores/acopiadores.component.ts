import { Component } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-acopiadores',
  imports: [SearchBarComponent],
  templateUrl: './acopiadores.component.html',
  styleUrl: './acopiadores.component.css'
})
export class AcopiadoresComponent {
    searchTerm = '';
  paginaActual = 1;
  elementosPorPagina = 7;
  estadoFiltro: string = 'todos';

  columnas = [
  { label: 'Nombre Apiario', key: 'apiario', align: 'center' },
  { label: 'Nombre de apicultor', key: 'apicultor', align: 'center' },
  { label: 'N° Colmenas', key: 'colmenas', align: 'center' },
  { label: 'latitud', key: 'latitud', align: 'center' },
  { label: 'longitud', key: 'longitud', align: 'center' },
  { label: 'alta', key: 'alta', align: 'center' } 
];
  onSearchChange(term: string) {
    this.searchTerm = term;
    this.paginaActual = 1;

  }
}
