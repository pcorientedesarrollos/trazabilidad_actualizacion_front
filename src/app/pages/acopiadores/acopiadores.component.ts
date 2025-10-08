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

@Component({
  selector: 'app-acopiadores',
  imports: [SearchBarComponent, CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, FooterComponent, TableComponent, PaginacionComponent, ModalComponent],
  templateUrl: './acopiadores.component.html',
  styleUrl: './acopiadores.component.css'
})
export class AcopiadoresComponent {

  public fb = inject(FormBuilder);

  constructor(private apicultorService: ApicultoresService, private acopiadoresService: AcopiadoresService, private exelService: ExcelService) { }


  searchTerm = '';
  paginaActual = 1;
  elementosPorPagina = 7;
  estadoFiltro: string = 'todos';
  isModalAddOpen = false;
  isModalUpdateOpen = false;
  acopiadorSeleccionado: any = null;

  isLoading: boolean = false;


  /*   columnas = [
    { label: 'Nombre del Acopiador', key: 'nombreProovedor', align: 'center' },
    { label: 'Tipo', key: 'tipo', align: 'center' },
    { label: 'Datos Fiscales', key: 'idDatosFiscales', align: 'center' },
    { label: 'Dirección', key: 'idDireccion', align: 'center' },
    { label: 'Sagarpa', key: 'idSagarpa', align: 'center' },
     { label: 'Estado', key: 'idEstado', align: 'center' },
      { label: 'Tipo de miel', key: 'tipoDeMiel', align: 'center' },
    { label: 'Cantidad', key: 'cantidad', align: 'center' },
    { label: 'Latitud', key: 'latitud', align: 'center' },
    { label: 'Longitud', key: 'longitud', align: 'center' },
    { label: 'Apicultor Asignado', key: 'NombreApicultor', align: 'center' },
    { label: 'N° Colmenas', key: 'NoColmenas', align: 'center' },
    { label: 'N° Apiarios', key: 'NoApiarios', align: 'center' }
  ]; */

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


  public agregarAcopiadorForm = this.fb.group({
    nombre: ['', Validators.required],
    idDatosFiscales: [null, Validators.required],
    idDireccion: [null, Validators.required],
    idSagarpa: ['', Validators.required],
    tipoDeMiel: [null, Validators.required],
    cantidad: [null, Validators.required],
    idEstado: [null, Validators.required],
    latitud: [null, Validators.required],
    longitud: [null, Validators.required],
    idApicultor: ['', Validators.required],


  });



  public actualizarAcopiadorForm = this.fb.group({
    nombre: ['', Validators.required],
    idDatosFiscales: [null, Validators.required],
    idDireccion: [null, Validators.required],
    idSagarpa: ['', Validators.required],
    tipoDeMiel: [null, Validators.required],
    cantidad: [null, Validators.required],
    idEstado: [null, Validators.required],
    latitud: [null, Validators.required],
    longitud: [null, Validators.required]
  });

  apicultores: any[] = [];
  acopiadores: Acopiador[] = [];

  apicultor = {
    acopiador: '',
  };


  ngOnInit(): void {
    this.obtenerAcopiadorConApicultor();
    this.obtenerApicultores();
  }

  get filtrados() {
    return this.acopiadorConTotalApicultores
      .filter(acopiador => {
        const nombreAcopiador = acopiador.nombreAcopiador ?? '';
        const sagarpa = acopiador.sagarpa ?? '';
        const termino = this.searchTerm.toLowerCase();
        return (
          nombreAcopiador.toLowerCase().includes(termino) ||
          sagarpa.toLowerCase().includes(termino)
        );
      }).filter(acopiador =>{
         const estatus = acopiador.estatus?.toLowerCase() ?? '';
         if (this.estadoFiltro === 'activo') return estatus === 'activo';
         if (this.estadoFiltro === 'inactivo') return estatus === 'inactivo';
         return true;
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
      nombre: acopiadorConApicultor.nombreProovedor,
      latitud: acopiadorConApicultor.latitud,
      longitud: acopiadorConApicultor.longitud,
      idDatosFiscales: acopiadorConApicultor.idDatosFiscales,
      idDireccion: acopiadorConApicultor.idDireccion,
      idSagarpa: acopiadorConApicultor.idSagarpa,
      tipoDeMiel: acopiadorConApicultor.tipoDeMiel,
      cantidad: acopiadorConApicultor.cantidad,
      idEstado: acopiadorConApicultor.idEstado,


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
          estado: a.estado,
          totalApicultores: a.totalApicultores,
          estatus: a.estatus

        }));
        console.log(data);
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


    // Primero agregamos el apicultor
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

    // 🔧 Convertimos los campos que deben ser numéricos
    const dataActualizada = {
      ...form,
      idDatosFiscales: Number(form.idDatosFiscales),
      idDireccion: Number(form.idDireccion),
      tipoDeMiel: Number(form.tipoDeMiel),
      cantidad: Number(form.cantidad),
      idEstado: Number(form.idEstado),
      latitud: parseFloat(form.latitud!),
      longitud: parseFloat(form.longitud!)
    };

    this.acopiadoresService.actualizarAcopiador(idProveedor, dataActualizada).subscribe({
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





}
