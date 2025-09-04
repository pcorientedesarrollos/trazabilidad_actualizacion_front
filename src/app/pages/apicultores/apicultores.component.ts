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

@Component({
  selector: 'app-apicultores',
  imports: [FooterComponent, CommonModule, SearchBarComponent, TableComponent, PaginacionComponent, FormsModule, ButtonComponent, ModalComponent, AlertComponent, ReactiveFormsModule],
  templateUrl: './apicultores.component.html',
  styleUrl: './apicultores.component.css'
})
export class ApicultoresComponent {
   
   public fb = inject(FormBuilder);
  constructor(private apicultorService: ApicultoresService) {}

    public agregarApicultorForm = this.fb.group({
      nombre: ['', Validators.required],
      curp: ['', Validators.required],
      rfc: [''],
      alta: ['', Validators.required],
      direccion: [''],
      estadoCodigo: [''],
      municipioCodigo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      senasica: [''],
      ippSiniga: [''],
      codigo: [''],
      idProveedor: ['', Validators.required]
  });


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
acopiadores: Acopiador[] = [];


apicultor = {
  acopiador: '',
};



  ngOnInit(): void {
    this.obtenerApicultores();
    this.obtenerAcopiadores();
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
      const ahora = new Date();
  const iso = ahora.toISOString().slice(0, 16); 
  this.agregarApicultorForm.patchValue({ alta: iso });

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


  editar(apicultor: any) {
    console.log('Editar', apicultor);
  }
 agregarApicultor() {
  if (this.agregarApicultorForm.invalid) {
    this.agregarApicultorForm.markAllAsTouched();
    return;
  }

  const formData = this.agregarApicultorForm.value;
  const idProveedorStr = formData.idProveedor;
 if (!idProveedorStr || isNaN(Number(idProveedorStr))) {
  Swal.fire('Error', 'El acopiador seleccionado es inválido.', 'error');
  return;
}

const idProveedor = parseInt(idProveedorStr, 10);


  if (formData.alta) {
  const fechaAlta = new Date(formData.alta);
  formData.alta = fechaAlta.toISOString(); 
}

   console.log(formData)
        console.log(idProveedor)
 

/*   this.apicultorService.agregarApicultor(formData).subscribe({
    next: (res: any) => {
      console.log(formData)
        console.log(idProveedor)
       if (typeof  idProveedor === 'number') {
        this.apicultorService.asignarAcopiador(this.apicultorSeleccionado.idApicultor,  idProveedor).subscribe({
          next: () => {
            Swal.fire('Éxito', 'Apicultor creado y acopiador asignado.', 'success');
            this.obtenerApicultores();
            this.closeModal();
            this.agregarApicultorForm.reset();
          },
          error: (err) => {
            console.error('Error al asignar acopiador:', err);
            Swal.fire('Error', 'Apicultor creado, pero no se pudo asignar el acopiador.', 'error');
          }
        });
      } else {
        Swal.fire('Error', 'No se pudo asignar el acopiador porque el valor es inválido.', 'error');
      } 
    },
    error: (err) => {
      console.error('Error al agregar apicultor:', err);
      Swal.fire('Error', 'No se pudo agregar el apicultor.', 'error');
    }
  });  */
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
