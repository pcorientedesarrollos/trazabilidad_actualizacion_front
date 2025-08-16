import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { TableComponent } from "../../components/table/table.component";
import { PaginacionComponent } from "../../components/paginacion/paginacion.component";
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../../components/button/button.component";
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
  selector: 'app-apicultores',
  imports: [FooterComponent, CommonModule, SearchBarComponent, TableComponent, PaginacionComponent, FormsModule, ButtonComponent,  ModalComponent],
  templateUrl: './apicultores.component.html',
  styleUrl: './apicultores.component.css'
})
export class ApicultoresComponent {
  searchTerm = '';
  paginaActual = 1;
  isModalAddOpen = false;
  elementosPorPagina = 7; 
  estadoFiltro: string = 'todos';

  columnas = [
    { label: 'Nombre Apicultor', key: 'nombre', align: 'center' },
    { label: 'Acopiador Asignado', key: 'acopiador', align: 'center' },
    { label: 'N° Apiarios', key: 'apiarios', align: 'center' },
    { label: 'N° Colmenas', key: 'colmenas', align: 'center' },
  ];

 apicultores = [
  { nombre: 'Julio Martín Ku', acopiador: 'Valeria Gomez', apiarios: 15, colmenas: 45, activo: true },
  { nombre: 'Fernando May', acopiador: 'Emiliano Vargas', apiarios: 15, colmenas: 45, activo: true },
  { nombre: 'Mariana Valenzuela', acopiador: 'Isabela Fuentes', apiarios: 15, colmenas: 45, activo: false },
  { nombre: 'Sofía Villegas', acopiador: 'Santiago Delgado', apiarios: 15, colmenas: 45, activo: true },
  { nombre: 'Leonel Rosado', acopiador: 'Emiliano Vargas', apiarios: 15, colmenas: 45, activo: false },
  { nombre: 'Elías Saens', acopiador: 'Isabela Fuentes', apiarios: 15, colmenas: 45, activo: true },
  { nombre: 'Gloria Bacells', acopiador: 'Emiliano Vargas', apiarios: 15, colmenas: 45, activo: false },
  { nombre: 'Juliana Dominguez', acopiador: 'Valeria Gomez', apiarios: 15, colmenas: 45, activo: true },
];



  get totalPaginas(): number {
    return Math.ceil(this.filtrados.length / this.elementosPorPagina);
  }

get filtrados() {
  return this.apicultores
    .filter(apicultor =>
      apicultor.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      apicultor.acopiador.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
    .filter(apicultor => {
      if (this.estadoFiltro === 'activos') return apicultor.activo;
      if (this.estadoFiltro === 'inactivos') return !apicultor.activo;
      return true; // todos
    });
}

cambiarEstado(apicultor: any, nuevoEstado: boolean) {
  apicultor.activo = nuevoEstado;
  // Opcional: mostrar un mensaje o refrescar la tabla (si usas observables, emitir cambios, etc.)
  console.log(`${nuevoEstado ? 'Activado' : 'Inactivado'} apicultor:`, apicultor);

  // Reflejar inmediatamente el cambio:
  this.paginaActual = 1; // Reiniciar paginación
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

    openModal() {
    this.isModalAddOpen = true;
  }

  closeModal() {
    this.isModalAddOpen = false;
  }


  editar(apicultor: any) {
    console.log('Editar', apicultor);
  }

  addApicultor(){
    console.log('Añadir apicultor')
  }

  ver(apicultor: any) {
    console.log('Ver', apicultor);
  }

  eliminar(apicultor: any) {
    console.log('Eliminar', apicultor);
  }

}
