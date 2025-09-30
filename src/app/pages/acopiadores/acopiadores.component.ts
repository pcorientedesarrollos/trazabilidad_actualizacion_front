import { Component } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../../components/button/button.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-acopiadores',
  imports: [SearchBarComponent, CommonModule, FormsModule, ButtonComponent, FooterComponent],
  templateUrl: './acopiadores.component.html',
  styleUrl: './acopiadores.component.css'
})
export class AcopiadoresComponent {

    constructor( private exelService : ExcelService) {}
openModal() {
throw new Error('Method not implemented.');
}

    searchTerm = '';
  paginaActual = 1;
  elementosPorPagina = 7;
  estadoFiltro: string = 'todos';
  isModalAddOpen = false;

  columnas = [
  { label: 'Nombre del Acopiador', key: 'acopiador', align: 'center' },
  { label: 'Tipo', key: 'tipo', align: 'center' },
  { label: 'Datos Fiscales', key: 'datosFiscales', align: 'center' },
  { label: 'Dirección', key: 'direccion', align: 'center' },
  { label: 'Sagarpa', key: 'sagarpa', align: 'center' },
  { label: 'Tipo de miel', key: 'tipodeMiel', align: 'center' },
  { label: 'Empresa', key: 'empresa', align: 'center' },
  { label: 'Cantidad', key: 'cantidad', align: 'center' },
  { label: 'Estado', key: 'estado', align: 'center' },
  { label: 'Latitud', key: 'latitud', align: 'center' },
  { label: 'Longitud', key: 'longitud', align: 'center' },
  { label: 'Nombre del apicultor', key: 'alta', align: 'center' },
  { label: 'N° Colmenas', key: 'alta', align: 'center' },
  { label: 'N° Apiarios', key: 'alta', align: 'center' },
  { label: 'Estatus', key: 'alta', align: 'center' }
];
  onSearchChange(term: string) {
    this.searchTerm = term;
    this.paginaActual = 1;
  }

  ExelDownload() {
 /* const data = this.filtrados;
  const nombreArchivo = 'acopiadores';

    this.exelService.exportAsExcelFile(data, nombreArchivo) */
}

  getAcopiadorConApicultor(){
  
  }
  
  agregarAcopiadorConApicultor(){

  }
  updateAcopiadorConApicultor(){

  }


}
