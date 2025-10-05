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
import { Apicultor } from '../apicultores/interface/apicultores.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apiarios',
  imports: [FooterComponent, CommonModule, SearchBarComponent,  TableComponent,  PaginacionComponent, FormsModule, ButtonComponent, ModalComponent, /*  AlertComponent, */ ReactiveFormsModule, FormsModule],
  templateUrl: './apiarios.component.html',
  styleUrl: './apiarios.component.css'
})
export class ApiariosComponent {
  constructor(private apiarioService: ApiariosService,  private exelService : ExcelService) { }

  public fb = inject(FormBuilder);
  searchTerm = '';
  paginaActual = 1;
  elementosPorPagina = 7;
  estadoFiltro: string = 'todos';
  isModalAddOpen = false;
  isModalUpdateOpen = false;
    apiarioSeleccionado: any = null;

    isLoading: boolean = false;

  columnas = [
    { label: 'Nombre Apiario', key: 'nombreApiario', align: 'center' },
    { label: 'Nombre de apicultor', key: 'nombreApicultor', align: 'center' },
    { label: 'N° Colmenas', key: 'colemnas', align: 'center' },
    { label: 'latitud', key: 'latitud', align: 'center' },
    { label: 'longitud', key: 'longitud', align: 'center' },
    { label: 'alta', key: 'alta', align: 'center' }
  ];
  apiarios: any[] = [];
  apicultores : any[] = [];

public agregarApiarioForm = this.fb.group({
  id_apicultor: ['', Validators.required],
  nombreApiario: ['', Validators.required],
  colmenas: [null, Validators.required],
  latitud: [null, Validators.required],
  longitud: [null, Validators.required],
   alta: ['', Validators.required],
});


 public actualizarApiarioForm = this.fb.group({
   id_apicultor: [null],
 nombreApiario: ['', Validators.required],
  NombreApiario: ['', Validators.required],
  colmenas: [null, Validators.required],
  latitud: [null, Validators.required],    
  longitud: [null, Validators.required],
  alta: ['', Validators.required],
});

  ngOnInit(): void {
    this.obtenertApiarios();
     this.obtenerApicultores();
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
    get paginados() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    return this.filtrados.slice(inicio, inicio + this.elementosPorPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.filtrados.length / this.elementosPorPagina);
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
  }
  onSearchChange(term: string) {
    this.searchTerm = term;
    this.paginaActual = 1;
  }

 
  ExelDownload() {
  const data = this.filtrados;
  const nombreArchivo = 'apiarios';
    this.exelService.exportAsExcelFile(data, nombreArchivo)
  }
   obtenertApiarios() {
      this.isLoading = true; 
  const inicioCarga = Date.now(); 
    this.apiarioService.getApiario().subscribe({
      next: (data :Apiarios[]) => {
        this.apiarios = data;

         const tiempoTranscurrido = Date.now() - inicioCarga;
      const tiempoRestante = 1000 - tiempoTranscurrido;

      if (tiempoRestante > 0) {
        setTimeout(() => {
          this.isLoading = false;
        }, tiempoRestante);
      } else {
        this.isLoading = false;
      }
      },
      error: (err) => {
        console.error('Error al obtener los apiarios', err);
      }
    });

  }

obtenerApicultores() {
  this.apiarioService.getAllApicultores().subscribe({
    next: (data: Apicultor[]) => {

   this.apicultores = data;
  console.log(data)
    },
    error: (err: any) => {
      console.error('Error al obtener apicultores', err);
    }
  });
}
  
  updateModal(apiario: any){
       this.apiarioSeleccionado = apiario;
  
  this.actualizarApiarioForm.patchValue({
      id_apicultor: apiario.idApicultor || '', 
 nombreApiario: apiario.nombreApiario,
  NombreApiario: apiario.nombreApicultor,
  colmenas: apiario.colemnas,
  latitud: apiario.latitud,    
  longitud: apiario.longitud,
      alta: new Date(apiario.alta).toISOString().slice(0, 16),

  });

  this.isModalUpdateOpen = true;
  }

agregarApiario() {
  if (this.agregarApiarioForm.invalid) {
    this.agregarApiarioForm.markAllAsTouched();
    return;
  }

  const formData = this.agregarApiarioForm.value;

  const idApicultorStr = formData.id_apicultor ?? '';
  const idApicultor = parseInt(idApicultorStr, 10);
  console.log(idApicultor)
  
  if (isNaN(idApicultor)) {
    console.error('ID de apicultor no válido:', formData.id_apicultor);
    return;
  }

  const altaFecha = formData.alta 
    ? new Date(formData.alta).toISOString() 
    : null;

  const apiarioData = {
    id_apicultor: idApicultor,
    nombreApiario: formData.nombreApiario,
    colmenas: formData.colmenas,
    latitud: formData.latitud,
    longitud: formData.longitud,
    alta: altaFecha
  };

  console.log('Datos a enviar:', apiarioData);

  this.apiarioService.agregarApiario(apiarioData).subscribe({
    next: () => {
     Swal.fire('Éxito', 'El apiario fue creado de manera exitosa.', 'success');
      this.obtenertApiarios();
      this.agregarApiarioForm.reset();
      this.closeModal();
    },
    error: (err) => {
      console.error('Error al agregar apiario', err);
    }
  });
}



editarApiario() {
  if (this.actualizarApiarioForm.invalid) return;

  const form = this.actualizarApiarioForm.value;

  const idApiario = parseInt(this.apiarioSeleccionado?.idApiario, 10);
  if (isNaN(idApiario)) {
    Swal.fire('Error', 'ID del apiario no válido', 'error');
    return;
  }

  const idApicultor = Number(form.id_apicultor);
  if (isNaN(idApicultor)) {
    Swal.fire('Error', 'ID del apicultor no válido', 'error');
    return;
  }

  const dataActualizada = {
    id_apicultor: idApicultor,
    nombreApiario: form.nombreApiario,
    colmenas: Number(form.colmenas),
    latitud: form.latitud? parseFloat(form.latitud) : null,
    longitud:form.longitud? parseFloat(form.longitud): null,
    alta: form.alta ? new Date(form.alta).toISOString() : null,
  };

  console.log('Payload a backend:', dataActualizada);

  this.apiarioService.actualizarApiario(idApiario, dataActualizada).subscribe({
    next: () => {
      Swal.fire('Éxito', 'Apiario actualizado con éxito.', 'success');
      this.isModalUpdateOpen = false;
      this.obtenertApiarios();
    },
    error: (err) => {
      console.error("Error al actualizar:", err);
      Swal.fire('Error', 'Apiario no actualizado', 'error');
    }
  });
}


}
