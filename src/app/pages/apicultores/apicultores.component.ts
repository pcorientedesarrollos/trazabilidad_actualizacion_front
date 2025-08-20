import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { TableComponent } from "../../components/table/table.component";
import { PaginacionComponent } from "../../components/paginacion/paginacion.component";
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../../components/button/button.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { Apicultor } from './interface/apicultores.interface';
import { ApicultoresService } from './service/apicultores.service';

@Component({
  selector: 'app-apicultores',
  imports: [FooterComponent, CommonModule, SearchBarComponent, TableComponent, PaginacionComponent, FormsModule, ButtonComponent,  ModalComponent],
  templateUrl: './apicultores.component.html',
  styleUrl: './apicultores.component.css'
})
export class ApicultoresComponent {

  constructor(private apicultorService: ApicultoresService) {}



  searchTerm = '';
  paginaActual = 1;
  isModalAddOpen = false;
  elementosPorPagina = 7; 
  estadoFiltro: string = 'todos';

columnas = [
  { label: 'Nombre Apicultor', key: 'apicultor', align: 'center' },
  { label: 'Acopiador Afiliado', key: 'acopiadorAfiliado', align: 'center' },
  { label: 'N° Apiarios', key: 'totalApiarios', align: 'center' },
  { label: 'N° Colmenas', key: 'totalColmenas', align: 'center' },
  { label: 'Estatus', key: 'estatus', align: 'center' } // 👈 agregado aquí
];


  apicultores: any[] = [];

  ngOnInit(): void {
    this.obtenerApicultores();
  }

  obtenerApicultores() {
  this.apicultorService.getAllApicultores().subscribe({
  next: (data: Apicultor[]) => {
    console.log(data)
  this.apicultores = data.map((a: Apicultor) => ({
    ...a,
     activo: a.estatus.toLowerCase() === 'activo',
  }));
},
    error: (err: any) => {
      console.error('Error al obtener apicultores', err);
    }
  });
}

  get totalPaginas(): number {
    return Math.ceil(this.filtrados.length / this.elementosPorPagina);
  }

get filtrados() {
  return this.apicultores
    .filter(apicultor => {
      const nombre = apicultor.apicultor ?? '';
      const acopiador = apicultor.acopiadorAfiliado ?? '';
      const termino = this.searchTerm.toLowerCase();
      return (
        nombre.toLowerCase().includes(termino) ||
        acopiador.toLowerCase().includes(termino)
      );
    })
    .filter(apicultor => {
      if (this.estadoFiltro === 'activo') return apicultor.activo === true;
      if (this.estadoFiltro === 'inactivo') return apicultor.activo === false;
      return true;
    });
}



cambiarEstado(apicultor: any, nuevoEstado: boolean) {
  apicultor.activo = nuevoEstado;
  console.log(`${nuevoEstado ? 'Activado' : 'Inactivado'} apicultor:`, apicultor);

  this.paginaActual = 1; 
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
