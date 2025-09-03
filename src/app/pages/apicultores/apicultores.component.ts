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
import { AlertComponent } from "../../components/alert/alert.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apicultores',
  imports: [FooterComponent, CommonModule, SearchBarComponent, TableComponent, PaginacionComponent, FormsModule, ButtonComponent, ModalComponent, AlertComponent],
  templateUrl: './apicultores.component.html',
  styleUrl: './apicultores.component.css'
})
export class ApicultoresComponent {

  constructor(private apicultorService: ApicultoresService) {}

  searchTerm = '';
  paginaActual = 1;
  isModalAddOpen = false;
  isAlertOpen = false;
  elementosPorPagina = 7; 
  estadoFiltro: string = 'todos';
  apicultorSeleccionado: any = null;
alertMessage = '';
accionModal: 'alta' | 'baja' | null = null;


columnas = [
  { label: 'Nombre Apicultor', key: 'apicultor', align: 'center' },
  { label: 'Acopiador Afiliado', key: 'acopiadorAfiliado', align: 'center' },
  { label: 'N° Apiarios', key: 'totalApiarios', align: 'center' },
  { label: 'N° Colmenas', key: 'totalColmenas', align: 'center' },
  { label: 'Estatus', key: 'estatus', align: 'center' } 
];


  apicultores: any[] = [];
  acopiadores = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'María López' },
  { id: 3, nombre: 'Carlos Ramírez' },
];

apicultor = {
  // propiedades del apicultor
  acopiador: '',
};




  ngOnInit(): void {
    this.obtenerApicultores();
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
  this.apicultorSeleccionado = apicultor;
  this.alertMessage = `¿Estás seguro que deseas ${nuevoEstado ? 'activar' : 'dar de baja'} a este apicultor?`;
  this.accionModal = nuevoEstado ? 'alta' : 'baja';
  this.isAlertOpen = true;
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

obtenerApicultores() {
  this.apicultorService.getAllApicultores().subscribe({
    next: (data: Apicultor[]) => {

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
  editar(apicultor: any) {
    console.log('Editar', apicultor);
  }
  addApicultor(){
    console.log('Añadir apicultor')
  }


confirmarCambioEstado() {
  if (!this.apicultorSeleccionado || !this.accionModal) return;

  if (this.accionModal === 'alta') {
    this.apicultorService.activarApicultores(this.apicultorSeleccionado.idApicultor).subscribe({
      next: (response) => {
          Swal.fire({
      title: '¡Alerta!',
      text: response.mensaje,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
        this.obtenerApicultores(); 
      },
      error: (err) => {
        console.error('Error al activar:', err);
            Swal.fire({
      title: '¡Alerta!',
      text: 'Algo malo ocurrió',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
      }
    });
  } else if (this.accionModal === 'baja') {
    this.apicultorService.bajaApicultores(this.apicultorSeleccionado.idApicultor).subscribe({
      next: (response) => {
             Swal.fire({
      title: '¡Alerta!',
      text: response.mensaje,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
        this.obtenerApicultores(); 
      },
      error: (err) => {
           Swal.fire({
      title: '¡Alerta!',
      text:'Algo malo ocurrió',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
      }
    });
  }

  this.isAlertOpen = false;
  this.accionModal = null;
}

cancelarCambioEstado() {
  this.isAlertOpen = false;
  this.accionModal = null;
}


}
