import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { TableComponent } from "../../components/table/table.component";
import { PaginacionComponent } from "../../components/paginacion/paginacion.component";

@Component({
  selector: 'app-apicultores',
  imports: [FooterComponent, CommonModule, SearchBarComponent, TableComponent, PaginacionComponent],
  templateUrl: './apicultores.component.html',
  styleUrl: './apicultores.component.css'
})
export class ApicultoresComponent {
  searchTerm = '';
  paginaActual = 1;
  elementosPorPagina = 7; 

  columnas = [
    { label: 'Nombre Apicultor', key: 'nombre', align: 'center' },
    { label: 'Acopiador Asignado', key: 'acopiador', align: 'center' },
    { label: 'N° Apiarios', key: 'apiarios', align: 'center' },
    { label: 'N° Colmenas', key: 'colmenas', align: 'center' },
  ];

  apicultores = [
    { nombre: 'Julio Martín Ku', acopiador: 'Valeria Gomez', apiarios: 15, colmenas: 45 },
    { nombre: 'Fernando May', acopiador: 'Emiliano Vargas', apiarios: 15, colmenas: 45 },
    { nombre: 'Mariana Valenzuela', acopiador: 'Isabela Fuentes', apiarios: 15, colmenas: 45 },
    { nombre: 'Sofía Villegas', acopiador: 'Santiago Delgado', apiarios: 15, colmenas: 45 },
    { nombre: 'Leonel Rosado', acopiador: 'Emiliano Vargas', apiarios: 15, colmenas: 45 },
    { nombre: 'Elías Saens', acopiador: 'Isabela Fuentes', apiarios: 15, colmenas: 45 },
    { nombre: 'Gloria Bacells', acopiador: 'Emiliano Vargas', apiarios: 15, colmenas: 45 },
    { nombre: 'Juliana Dominguez', acopiador: 'Valeria Gomez', apiarios: 15, colmenas: 45 },
  ];

  get totalPaginas(): number {
    return Math.ceil(this.filtrados.length / this.elementosPorPagina);
  }

  get filtrados() {
    return this.apicultores.filter(apicultor =>
      apicultor.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      apicultor.acopiador.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginados() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    return this.filtrados.slice(inicio, inicio + this.elementosPorPagina);
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.paginaActual = 1; 
  }

  onDownload() {
    console.log('Descargando archivo...');
  }

  onAdd() {
    console.log('Agregando nuevo apicultor...');
  }

  editar(apicultor: any) {
    console.log('Editar', apicultor);
  }

  ver(apicultor: any) {
    console.log('Ver', apicultor);
  }

  eliminar(apicultor: any) {
    console.log('Eliminar', apicultor);
  }

}
