import { Component, inject } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [FooterComponent, CommonModule, SearchBarComponent,  TableComponent,  PaginacionComponent, FormsModule, ButtonComponent, ModalComponent, /*  AlertComponent, */ ReactiveFormsModule, FormsModule],
  templateUrl: './apiarios.component.html',
  styleUrl: './apiarios.component.css'
})
export class ApiariosComponent {


  public fb = inject(FormBuilder);
  constructor(private apiarioService: ApiariosService,  private exelService : ExcelService) { }
  searchTerm = '';
  paginaActual = 1;
  elementosPorPagina = 7;
  estadoFiltro: string = 'todos';
  isModalAddOpen = false;
  isModalUpdateOpen = false;
    apiarioSeleccionado: any = null;

  columnas = [
    { label: 'Nombre Apiario', key: 'nombreApiario', align: 'center' },
    { label: 'Nombre de apicultor', key: 'nombreApicultor', align: 'center' },
    { label: 'N° Colmenas', key: 'colmenas', align: 'center' },
    { label: 'latitud', key: 'latitud', align: 'center' },
    { label: 'longitud', key: 'longitud', align: 'center' },
    { label: 'alta', key: 'alta', align: 'center' }
  ];
  apiarios: any[] = [];

   public agregarApiarioForm = this.fb.group({
 nombreApiario: ['', Validators.required],
  NombreApiario: ['', Validators.required],
  colmenas: [null, Validators.required],
  latitud: [null, Validators.required],    
  longitud: [null, Validators.required],
  alta: [null, Validators.required],
});

 public actualizarApiarioForm = this.fb.group({
 nombreApiario: ['', Validators.required],
  NombreApiario: ['', Validators.required],
  colmenas: [null, Validators.required],
  latitud: [null, Validators.required],    
  longitud: [null, Validators.required],
  alta: [null, Validators.required], 
});

  ngOnInit(): void {
    this.obtenertApiarios();
  }
  openModal() {
    this.isModalAddOpen = true;
  }
  closeModal() {
    this.isModalAddOpen = false;
  }

  closeModalUpdate() {
    this.isModalUpdateOpen = false;
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
  
  updateModal(apiario: any){
       this.apiarioSeleccionado = apiario;

  this.actualizarApiarioForm.patchValue({
 nombreApiario: apiario.nombreApiario,
  NombreApiario: apiario.nombreApicultor,
  colmenas: apiario.colemnas,
  latitud: apiario.latitud,    
  longitud: apiario.longitud,
  alta: apiario.alta, 

  });

  this.isModalUpdateOpen = true;
  }

  agregarApiario() {

  }
  editarApiario(){

  }

}
