import { Component, inject } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../components/button/button.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ExcelService } from '../../services/excel.service';
import { AcopiadoresService } from './service/acopiadores.service';
import { AcopiadoresConApicultor } from './interface/acopiadores.interface';
import { TableComponent } from "../../components/table/table.component";
import { PaginacionComponent } from "../../components/paginacion/paginacion.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { Acopiador } from '../apicultores/interface/acopiadores.interface';
import { ApicultoresService } from '../apicultores/service/apicultores.service';
import { Apicultor } from '../apicultores/interface/apicultores.interface';
import Swal from 'sweetalert2';
import { AcopiadoresConTotalApicultores } from './interface/acopiadoresConTotalApiocultores.interface';
import { AlertComponent } from "../../components/alert/alert.component";
import { Response } from '../../interface/response.interface';
import { EstadosService } from '../../services/estados.service';
import { MunicipiosService } from '../../services/municipios.service';

@Component({
  selector: 'app-acopiadores',
  imports: [SearchBarComponent, CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, FooterComponent, TableComponent, PaginacionComponent, ModalComponent, AlertComponent],
  templateUrl: './acopiadores.component.html',
  styleUrl: './acopiadores.component.css'
})
export class AcopiadoresComponent {

  public fb = inject(FormBuilder);

  constructor(private apicultorService: ApicultoresService, private acopiadoresService: AcopiadoresService, private exelService: ExcelService,  private estadosService:EstadosService, private municipiosService:MunicipiosService) { }


  searchTerm = '';
  paginaActual = 1;
  elementosPorPagina = 7;
  estadoFiltro: string = 'todos';
  isModalAddOpen = false;
  isModalUpdateOpen = false;
  acopiadorSeleccionado: any = null;
  isLoading: boolean = false;
  alertMessage = '';
  accionModal: 'alta' | 'baja' | 'update' | null = null;
  isAlertOpen = false;




  columnas = [
    { label: 'Nombre del Acopiador', key: 'nombreAcopiador', align: 'center' },
    { label: 'Sagarpa', key: 'sagarpa', align: 'center' },
    { label: 'Latitud', key: 'latitud', align: 'center' },
    { label: 'Sagarpa', key: 'sagarpa', align: 'center' },
    { label: 'Estado', key: 'estado', align: 'center' },
    { label: 'N° Apicultores', key: 'totalApicultores', align: 'center' },
    { label: 'Estatus', key: 'estatus', align: 'center' }
  ]

  acopiadorConApicultor: any[] = [];
  acopiadorConTotalApicultores: any[] = [];
  estados : any[] =[];
municipios:any[]=[];


  public agregarAcopiadorForm = this.fb.group({
    nombre: ['', Validators.required],
    idDatosFiscales: [null, Validators.required],
    idDireccion: [null, Validators.required],
    idSagarpa: ['', Validators.required],
    tipoDeMiel: [null, Validators.required],
    cantidad: [null, Validators.required],
    idEstado: ["", Validators.required],
    latitud: [null, Validators.required],
    longitud: [null, Validators.required],
    idApicultor: ['', Validators.required],


  });



  public actualizarAcopiadorForm = this.fb.group({
    nombre: ['', Validators.required],
    idSagarpa: ['', Validators.required],
    latitud: [null, Validators.required],
    longitud: [null, Validators.required],
    idEstado: ["", Validators.required],
    idMunicipio: ["", Validators.required]
  });

  apicultores: any[] = [];
  acopiadores: Acopiador[] = [];

  apicultor = {
    acopiador: '',
  };


  ngOnInit(): void {
    this.obtenerAcopiadorConApicultor();
    this.obtenerApicultores();
    this.obtenerEstados()
  }

get filtrados() {
  return this.acopiadorConTotalApicultores
    .filter(acopiador => {
      const nombreAcopiador = String(acopiador.nombreAcopiador ?? '');
      const sagarpa = String(acopiador.sagarpa ?? '');
      const termino = this.searchTerm.toLowerCase();

      return (
        nombreAcopiador.toLowerCase().includes(termino) ||
        sagarpa.toLowerCase().includes(termino)
      );
    }).filter(acopiador => {
      const estatus = String(acopiador.estatus ?? '').toLowerCase();
      if (this.estadoFiltro === 'activo') return estatus === 'activo';
      if (this.estadoFiltro === 'inactivo') return estatus === 'inactivo';
      return true;
    });
}
  cambiarEstado(acopiador: any, nuevoEstado: boolean) {
    this.acopiadorSeleccionado = acopiador;
    this.alertMessage = `¿Estás seguro que deseas ${nuevoEstado ? 'activar' : 'dar de baja'} a este apicultor?`;
    this.accionModal = nuevoEstado ? 'alta' : 'baja';
    this.isAlertOpen = true;
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
    const nombreArchivo = 'acopiadores';

    this.exelService.exportAsExcelFile(data, nombreArchivo)
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

  updateModal(acopiadorConApicultor: any) {

    this.acopiadorSeleccionado = acopiadorConApicultor;
    this.actualizarAcopiadorForm.patchValue({
      nombre: acopiadorConApicultor.nombreAcopiador,
      idSagarpa: acopiadorConApicultor.sagarpa,
      latitud: acopiadorConApicultor.latitud,
      longitud: acopiadorConApicultor.longitud,
      idEstado: acopiadorConApicultor.idEstado,
      idMunicipio:acopiadorConApicultor.idMunicipio
    });


    this.isModalUpdateOpen = true;
  }

  obtenerAcopiadorConApicultor() {

    this.isLoading = true;
    const inicioCarga = Date.now();
    this.acopiadoresService.getAcopiadorConTotalApicultores().subscribe({
      next: (data: AcopiadoresConTotalApicultores[]) => {
        this.acopiadorConTotalApicultores = data.map((a: AcopiadoresConTotalApicultores) => ({
          ...a,
          nombreAcopiador: a.nombreAcopiador,
          sagarpa: a.sagarpa,
          latitud: a.latitud,
          longitud: a.longitud,
          idEstado:a.idEstado,
          estado: a.estado,
          totalApicultores: a.totalApicultores,
          estatus: a.estatus

        }));
        console.log('TotalApicultores',data);
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
        console.error('Error al obtener los acopiadores con total de apicultores', err);
      }
    });


  }

  obtenerApicultores() {
    this.acopiadoresService.getAllApicultores().subscribe({
      next: (data: Apicultor[]) => {

        this.apicultores = data;
        console.log(data)
      },
      error: (err: any) => {
        console.error('Error al obtener apicultores', err);
      }
    });
  }
  obtenerEstados(){
    try {
       this.estadosService.getEstados().subscribe({
        next:(data)=>{
          console.log(data);
          this.estados = data;
        }
      });
      
    } catch (error) {
          console.error("Error al obtener los estados:", error);
       Swal.fire('Error', 'Error al obtener los estados', 'error');
      
    }
  }
  
  obtenerMunicipios(){
      try {
        this.municipiosService.getMunicipios().subscribe({
              next:(data)=>{
                this.municipios = data;
              }
        })
      } catch (error) {
           console.error("Error al obtener los estados:", error);
       Swal.fire('Error', 'Error al obtener los municipios', 'error');
      }
  }
  agregarAcopiador() {
    const form = this.agregarAcopiadorForm;

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const formData = this.agregarAcopiadorForm.value;
    const idApicultor = formData.idApicultor;
    if (!idApicultor || isNaN(Number(idApicultor))) {
      Swal.fire('Error', 'Debes seleccionar un acopiador válido antes de continuar.', 'error');
      return;
    }
    const nuevoAcopiador = {
      nombre: formData.nombre,
      idDatosFiscales: Number(formData.idDatosFiscales),
      idDireccion: Number(formData.idDireccion),
      idSagarpa: formData.idSagarpa,
      tipoDeMiel: Number(formData.tipoDeMiel),
      cantidad: Number(formData.cantidad),
      idEstado: Number(formData.idEstado),
      latitud: Number(formData.latitud),
      longitud: Number(formData.longitud)
    };


    this.acopiadoresService.agregarAcopiador(nuevoAcopiador).subscribe({

      next: (res) => {
        console.log(res.data?.idProveedor)
        const idProveedor = res.data?.idProveedor;

        this.acopiadoresService.asignarApicultor(Number(idApicultor), idProveedor).subscribe({
          next: () => {
            Swal.fire('Éxito', 'Apicultor creado y acopiador asignado correctamente.', 'success');
            this.obtenerAcopiadorConApicultor();
            this.closeModal();
            this.agregarAcopiadorForm.reset();
          },
          error: (err) => {
            console.error('Error al asignar apicultor:', err);
            Swal.fire('Error', 'No se pudo asignar el apicultor.', 'error');
          }
        });

      },
      error: (err) => {
        console.error('Error al agregar apicultor:', err);
        Swal.fire('Error', 'No se pudo agregar el apicultor.', 'error');
      }
    });
  }

  editarAcopiador() {
    if (this.actualizarAcopiadorForm.invalid) {
      this.actualizarAcopiadorForm.markAllAsTouched();
      return;
    }

    const form = this.actualizarAcopiadorForm.value;
    const idProveedor = this.acopiadorSeleccionado?.idProveedor;

    const dataActualizada = {
      nombre: form.nombre,
      idSagarpa: form.idSagarpa,
      latitud: parseFloat(form.latitud!),
      longitud: parseFloat(form.longitud!),
      idEstado: Number(form.idEstado)
    };

    this.acopiadoresService.actualizarAcopiadorConTotalApicultor(idProveedor, dataActualizada).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Acopiador actualizado correctamente.', 'success');
        this.obtenerAcopiadorConApicultor();
        this.closeModalUpdate();
      },
      error: (err) => {
        console.error('Error al actualizar acopiador:', err);
        Swal.fire('Error', err?.error?.message || 'No se pudo actualizar el acopiador.', 'error');
      }
    });
  }

confirmarCambioEstado() {
  if (!this.acopiadorSeleccionado || !this.accionModal) return;

  if (this.accionModal === 'alta') {
    this.acopiadoresService.activarAcopiador(this.acopiadorSeleccionado.idProveedor).subscribe({
      next: (res) => {
        Swal.fire({
          title: '¡Alerta!',
          text: res.mensaje,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.obtenerApicultores();
        this.obtenerAcopiadorConApicultor(); // <-- te falta esto para refrescar la tabla
        this.cancelarCambioEstado();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          title: 'Error',
          text: err.error?.mensaje || 'No se pudo activar el acopiador',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  } else if (this.accionModal === 'baja') {
    this.acopiadoresService.bajaAcopiador(this.acopiadorSeleccionado.idProveedor).subscribe({
      next: (res) => {
        Swal.fire({
          title: '¡Alerta!',
          text: res.mensaje,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.obtenerApicultores();
        this.obtenerAcopiadorConApicultor(); 
        this.cancelarCambioEstado();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          title: 'Error',
          text: err.error?.mensaje || 'No se pudo dar de baja el acopiador',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}


cancelarCambioEstado() {
  this.isAlertOpen = false;
  this.accionModal = null;
}




}
