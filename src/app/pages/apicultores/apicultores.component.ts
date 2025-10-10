import { Component, EventEmitter, inject, Inject, Input, Output } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { TableComponent } from "../../components/table/table.component";
import { PaginacionComponent } from "../../components/paginacion/paginacion.component";
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../components/button/button.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { Apicultor } from './interface/apicultores.interface';
import { ApicultoresService } from './service/apicultores.service';
import { AlertComponent } from "../../components/alert/alert.component";
import Swal from 'sweetalert2';
import { Acopiador } from './interface/acopiadores.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { ExcelService } from '../../services/excel.service';
import { ApicultoresConTotalApiarios } from './interface/apicultoresConTotalApiarios.interface';

@Component({
  selector: 'app-apicultores',
  imports: [FooterComponent, CommonModule, SearchBarComponent, TableComponent, PaginacionComponent, FormsModule, ButtonComponent, ModalComponent, AlertComponent, ReactiveFormsModule],
  templateUrl: './apicultores.component.html',
  styleUrl: './apicultores.component.css'
})
export class ApicultoresComponent {
   
   public fb = inject(FormBuilder);
  constructor(private apicultorService: ApicultoresService, private exelService : ExcelService) {}

 public agregarApicultorForm = this.fb.group({
  nombre: ['', Validators.required],
  CURP: ['', Validators.required],
  RFC: [''],
  alta: ['', Validators.required],
  direccion: [''],
  estado_codigo: [''],
  municipio_codigo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
  Senasica: [''],
  IPPSiniga: [''],
  codigo: [''],
  idProveedor: ['', Validators.required],
  estatus: ['Activo'] // 
});

 public actualizarApicultorForm = this.fb.group({
  nombre: ['', Validators.required],
  CURP: ['', Validators.required],
  RFC: [''],
  alta: ['', Validators.required],
  direccion: [''],
  estado_codigo: [''],
  municipio_codigo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
  Senasica: [''],
  IPPSiniga: [''],
  codigo: [''],
  idProveedor: ['', Validators.required],
  estatus: ['Activo'] // 
});


  searchTerm = '';
  paginaActual = 1;
  isModalAddOpen = false;
  isModalUpdateOpen = false;
  isAlertOpen = false;
  elementosPorPagina = 7; 
  estadoFiltro: string = 'todos';
  apicultorSeleccionado: any = null;
alertMessage = '';
accionModal: 'alta' | 'baja' | 'update' | null = null;
isLoading: boolean = false;



columnas = [
  { label: 'Nombre Apicultor', key: 'nombreApicultor', align: 'center' },
  { label: 'Senasica', key: 'senasica', align: 'center' },
  { label: 'IppSiniga', key: 'ippSiniga', align: 'center' },
  { label: 'Estado', key: 'estado', align: 'center' } ,
   { label: 'Municipio', key: 'municipio', align: 'center' } ,
    { label: 'N° Apiarios', key: 'totalApiarios', align: 'center' },
    { label: 'Estatus', key: 'estatus', align: 'center' } 
];


  apicultores: any[] = [];
  apicultoresConTotalApiarios :any[] = [];
acopiadores: Acopiador[] = [];


apicultor = {
  acopiador: '',
};

  ngOnInit(): void {
    this.isLoading = true;
    this.obtenerApicultores();
    this.obtenerAcopiadores();
  }

  get totalPaginas(): number {
    return Math.ceil(this.filtrados.length / this.elementosPorPagina);
  }

get filtrados() {
  return this.apicultoresConTotalApiarios
    .filter(apicultor => {
      const nombreApicultor = (apicultor.nombreApicultor ?? '').toLowerCase();
      const senasica = (apicultor.senasica ?? '').toString().toLowerCase();
      const termino = this.searchTerm.toLowerCase();

      return (
        nombreApicultor.includes(termino) ||
        senasica.includes(termino)
      );
    })
    .filter(apicultor => {
      const estatus = apicultor.estatus?.toLowerCase() ?? '';
      if (this.estadoFiltro === 'activo') return estatus === 'activo';
      if (this.estadoFiltro === 'inactivo') return estatus === 'inactivo';
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
  ExelDownload() {
     const data = this.filtrados;
  const nombreArchivo = 'apicultores';

    this.exelService.exportAsExcelFile(data, nombreArchivo)
  }
    openModal() {
      const ahora = new Date();
  const iso = ahora.toISOString().slice(0, 16); 
  this.agregarApicultorForm.patchValue({ alta: iso });

    this.isModalAddOpen = true;
  }

updateModal(apicultor: any) {
  this.apicultorSeleccionado = apicultor;

  this.actualizarApicultorForm.patchValue({
    nombre: apicultor.nombre,
    CURP: apicultor.CURP,
    RFC: apicultor.RFC,
    alta: new Date(apicultor.alta).toISOString().slice(0, 16),
    direccion: apicultor.direccion,
    estado_codigo: apicultor.estado_codigo,
    municipio_codigo: apicultor.municipio_codigo,
    Senasica: apicultor.Senasica,
    IPPSiniga: apicultor.IPPSiniga,
    codigo: apicultor.codigo,
      idProveedor: apicultor.idProveedor,
       estatus: apicultor.estatus

  });

  this.isModalUpdateOpen = true;
}

  closeModal() {
    this.isModalAddOpen = false;
  }

   closeModalUpdate() {
    this.isModalUpdateOpen = false;
  }

obtenerApicultores() {
  this.isLoading = true; 
  const inicioCarga = Date.now(); 

  this.apicultorService.getApicultorConToTalApiarios().subscribe({
    next: (data: ApicultoresConTotalApiarios[]) => {
      this. apicultoresConTotalApiarios = data.map((a: ApicultoresConTotalApiarios) => ({
        ...a,
       nombreApicultor: a.nombreApicultor,
        senasica: a.senasica,
        ippSiniga: a.ippSiniga,
        totalApiarios : a.totalApiarios,
        estado : a.estado,
        estatus : a.estatus
      }));

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
    error: (err: any) => {
      console.error('Error al obtener apicultores', err);
      this.isLoading = false;
    }
  });
}



obtenerAcopiadores() {
  this.apicultorService.getAllAcopiadores().subscribe({
    next: (data) => {
      this.acopiadores = data;
    },
    error: (err) => {
      console.error('Error al obtener acopiadores', err);
    }
  });
}

editarApicultor() {
  if (this.actualizarApicultorForm.invalid) return;

  const dataActualizada = this.actualizarApicultorForm.value;
  const idApicultor = this.apicultorSeleccionado?.idApicultor;
 console.log(dataActualizada)
  console.log(idApicultor ) 

this.apicultorService.updateApicultor(idApicultor, dataActualizada).subscribe({
  next: () => {
       Swal.fire('Éxito', 'Apicultor actualizado con exito.', 'success');
    this.accionModal = 'update';  
    this.isModalUpdateOpen = false;
    this.obtenerApicultores();
  },
  error: (err) => {
    console.error("Error al actualizar:", err);
     Swal.fire('Error', 'Apicultor no actualizado', 'error');

  }
});
}

agregarApicultor() {
  if (this.agregarApicultorForm.invalid) {
    this.agregarApicultorForm.markAllAsTouched();
    return;
  }

  const formData = this.agregarApicultorForm.value;

  const idProveedorStr = formData.idProveedor;
  if (!idProveedorStr || isNaN(Number(idProveedorStr))) {
    Swal.fire('Error', 'Debes seleccionar un acopiador válido antes de continuar.', 'error');
    return;
  }

  const idProveedor = parseInt(idProveedorStr, 10);

  if (formData.alta) {
    const fechaAlta = new Date(formData.alta);
    formData.alta = fechaAlta.toISOString();
  }

  this.apicultorService.agregarApicultor(formData).subscribe({
    next: (res: any) => {
      const idApicultorCreado = res?.data?.idApicultor;

      if (!idApicultorCreado) {
        Swal.fire('Error', 'El apicultor se creó, pero no se recibió su ID.', 'error');
        return;
      }

      this.apicultorService.asignarAcopiador(idApicultorCreado, idProveedor).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Apicultor creado y acopiador asignado correctamente.', 'success');
          this.obtenerApicultores();
          this.closeModal();
          this.agregarApicultorForm.reset();
        },
        error: (err) => {
          console.error('Error al asignar acopiador:', err);
          Swal.fire('Error', 'Apicultor creado, pero ocurrió un error al asignar el acopiador.', 'error');
        }
      });
    },
    error: (err) => {
      console.error('Error al agregar apicultor:', err);
      Swal.fire('Error', 'No se pudo agregar el apicultor.', 'error');
    }
  });
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
