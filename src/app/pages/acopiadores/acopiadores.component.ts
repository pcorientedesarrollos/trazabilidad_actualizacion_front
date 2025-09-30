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

@Component({
  selector: 'app-acopiadores',
  imports: [SearchBarComponent, CommonModule, FormsModule,ReactiveFormsModule, ButtonComponent, FooterComponent, TableComponent, PaginacionComponent, ModalComponent],
  templateUrl: './acopiadores.component.html',
  styleUrl: './acopiadores.component.css'
})
export class AcopiadoresComponent {

    public fb = inject(FormBuilder);

    constructor( private acopiadoresService: AcopiadoresService, private exelService : ExcelService) {}


    searchTerm = '';
  paginaActual = 1;
  elementosPorPagina = 7;
  estadoFiltro: string = 'todos';
  isModalAddOpen = false;
  isModalUpdateOpen = false;
  acopiadorSeleccionado: any = null;


  columnas = [
  { label: 'Nombre del Acopiador', key: 'nombreProovedor', align: 'center' },
  { label: 'Tipo', key: 'tipo', align: 'center' },
  { label: 'Datos Fiscales', key: 'idDatosFiscales', align: 'center' },
  { label: 'Dirección', key: 'idDireccion', align: 'center' },
  { label: 'Sagarpa', key: 'idSagarpa', align: 'center' },
   { label: 'Estado', key: 'idEstado ', align: 'center' },
    { label: 'Tipo de miel', key: 'tipoDeMiel', align: 'center' },
  { label: 'Cantidad', key: 'cantidad', align: 'center' },
  { label: 'Latitud', key: 'latitud', align: 'center' },
  { label: 'Longitud', key: 'longitud', align: 'center' },
  { label: 'Apicultor Asignado', key: 'NombreApicultor', align: 'center' },
  { label: 'N° Colmenas', key: 'NoColmenas', align: 'center' },
  { label: 'N° Apiarios', key: 'NoApiarios', align: 'center' }
];

 acopiadorConApicultor: any[] = [];

 
public agregarAcopiadorForm = this.fb.group({
 
  nombre: ['', Validators.required],
  NombreApiario: ['', Validators.required],
  colmenas: [null, Validators.required],
  latitud: [null, Validators.required],
  longitud: [null, Validators.required],
  alta: [null, Validators.required],
  idDatosFiscales: [null],    
  idDireccion: [null],         
  idSagarpa: [null],           
  tipoDeMiel: [null],          
  cantidad: [null],          
  tipo: ['acopiador'],    
  idComprador: [null],       
  empresa: [0],               
  idEstado: [1],              
  activoInactivo: [0],        
  deleteProve: [0],            
});

 public actualizarAcopiadorForm = this.fb.group({
  nombre: ['', Validators.required],
  NombreApiario: ['', Validators.required],
  colmenas: [null, Validators.required],
  latitud: [null, Validators.required],
  longitud: [null, Validators.required],
  alta: [null, Validators.required],
  idDatosFiscales: [null],    
  idDireccion: [null],         
  idSagarpa: [null],           
  tipoDeMiel: [null],          
  cantidad: [null],          
  tipo: ['acopiador'],    
  idComprador: [null],       
  empresa: [0],               
  idEstado: [1],              
  activoInactivo: [0],        
  deleteProve: [0],  
});


     ngOnInit(): void {
    this.obtenerAcopiadorConApicultor();
  }

   get filtrados(){
    return this.acopiadorConApicultor
    .filter(acopiador => {
             const nombreProveedor = acopiador.nombreProovedor ?? '';
      const apicultor = acopiador.NombreApicultor  ?? '';
      const termino = this.searchTerm.toLowerCase();
      return (
        nombreProveedor.toLowerCase().includes(termino) ||
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

  updateModal(acopiadorConApicultor: any){
       this.acopiadorSeleccionado = acopiadorConApicultor;

 this.actualizarAcopiadorForm.patchValue({
  nombre: acopiadorConApicultor.nombreProovedor,
/*   NombreApiario: acopiadorConApicultor.NombreApicultor, */
  colmenas: acopiadorConApicultor.colmenas,
  latitud: acopiadorConApicultor.latitud,
  longitud: acopiadorConApicultor.longitud,
  alta: acopiadorConApicultor.alta,
  idDatosFiscales: acopiadorConApicultor.idDatosFiscales,
  idDireccion: acopiadorConApicultor.idDireccion,
  idSagarpa: acopiadorConApicultor.idSagarpa,
  tipoDeMiel: acopiadorConApicultor.tipoDeMiel,
  cantidad: acopiadorConApicultor.cantidad,
  tipo: acopiadorConApicultor.tipo ?? 'acopiador',
  idComprador: acopiadorConApicultor.idComprador ?? null,
  empresa: acopiadorConApicultor.empresa ?? 0,
  idEstado: acopiadorConApicultor.idEstado ?? 1,
  activoInactivo: acopiadorConApicultor.activoInactivo ?? 0,
  deleteProve: acopiadorConApicultor.deleteProve ?? 0,
});

  this.isModalUpdateOpen = true;
  }

  obtenerAcopiadorConApicultor(){
    this.acopiadoresService.getAcopiadorConApicultor().subscribe({
      next:(data : AcopiadoresConApicultor[]) => {
        this.acopiadorConApicultor = data.map((a : AcopiadoresConApicultor)=>({
            ...a,
             nombreProovedor: a.nombreProovedor,
             tipo  : a.tipo,
             idDatosFiscales : a.idDatosFiscales,
             idDireccion : a.idDireccion,
             idSagarpa : a.idSagarpa,
             tipoDeMiel : a.tipoDeMiel,
             empresa : a.empresa,
             cantidad : a.cantidad,
              idEstado : a.idEstado,
              latitud : a.latitud,
              longitud : a.longitud,
              NombreApicultor : a.NombreApicultor,
              NoColmenas : a.NoColmenas,
              NoApiarios : a.NoApiarios
        }));
        console.log(data);
      },
       error: (err) => {
      console.error('Error al obtener los acopiadores con apicultor', err);
    }
    })
  
  }
  
  agregarAcopiador(){

  }

    editarAcopiador(){

  }




}
