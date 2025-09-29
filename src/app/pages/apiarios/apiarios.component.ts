import { Component } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../../components/button/button.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { PaginacionComponent } from '../../components/paginacion/paginacion.component';
import { TableComponent } from '../../components/table/table.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { ApiariosService } from './service/apiarios.service';
import { Apiarios } from './interface/apiarios.interface';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-apiarios',
  imports: [FooterComponent, CommonModule, SearchBarComponent,  TableComponent,  PaginacionComponent, FormsModule, ButtonComponent, /* ModalComponent,  AlertComponent, */ ReactiveFormsModule],
  templateUrl: './apiarios.component.html',
  styleUrl: './apiarios.component.css'
})
export class ApiariosComponent {
apicultor: any;
updateModal(arg0: any) {
throw new Error('Method not implemented.');
}

  constructor(private apiarioService: ApiariosService,  private exelService : ExcelService) { }
  searchTerm = '';
  paginaActual = 1;
  elementosPorPagina = 7;
  estadoFiltro: string = 'todos';
  isModalAddOpen = false;

  columnas = [
    { label: 'Nombre Apiario', key: 'nombreApiario', align: 'center' },
    { label: 'Nombre de apicultor', key: 'nombreApicultor', align: 'center' },
    { label: 'N° Colmenas', key: 'colmenas', align: 'center' },
    { label: 'latitud', key: 'latitud', align: 'center' },
    { label: 'longitud', key: 'longitud', align: 'center' },
    { label: 'alta', key: 'alta', align: 'center' }
  ];
  apiarios: any[] = [];

  ngOnInit(): void {
    this.obtenertApiarios();
  }
  openModal() {
    this.isModalAddOpen = true;
  }
  closeModal() {
    this.isModalAddOpen = false;
  }

  get totalPaginas(): number {
    return Math.ceil(this.filtrados.length / this.elementosPorPagina);
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
  }

  get paginados() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    return this.filtrados.slice(inicio, inicio + this.elementosPorPagina);
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.paginaActual = 1;
  }

  get filtrados(){
    return this.apiarios
    .filter(apiario => {
             const nombre = apiario.nombreApiario ?? '';
      const apicultor = apiario.nombreApicultor  ?? '';
      const termino = this.searchTerm.toLowerCase();
      return (
        nombre.toLowerCase().includes(termino) ||
        apicultor.toLowerCase().includes(termino)
      );
    })
  }

  obtenertApiarios() {
    this.apiarioService.getApiario().subscribe({
      next: (data :Apiarios[]) => {
        this.apiarios = data.map((a: Apiarios) =>({
          ...a,
           nombreApiario : a.nombreApiario,
           nombreApicultor : a.nombreApicultor,
           colmenas: a.colemnas,
           latitud : a.latitud,
           longitud : a.longitud,
           alta : a.alta
        }));
      },
      error: (err) => {
        console.error('Error al obtener los apiarios', err);
      }
    });

  }
  ExelDownload() {
  const data = this.filtrados;
  const nombreArchivo = 'apiarios';
    this.exelService.exportAsExcelFile(data, nombreArchivo)
  }


}
