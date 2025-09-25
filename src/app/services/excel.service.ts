import { Injectable } from "@angular/core";
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


@Injectable({
    providedIn : 'root'
})

export class ExcelService{
  
    constructor(){}  

    async exportAsExcelFile(data: any[], fileName: string): Promise<void> {
        if (!data || data.length === 0) {
        console.warn('No hay datos para exportar.');
        return;
        }

        const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Hoja 1');

      // Obtener las claves del primer objeto como cabeceras
    const columns = Object.keys(data[0]).map(key => ({
      header: this.capitalize(key),
      key: key,
      width: 20,
    }));

    worksheet.columns = columns;
    data.forEach(item => worksheet.addRow(item));

    // Opcional: Ajustar estilo de la cabecera
    worksheet.getRow(1).font = { bold: true };

       // Crear y descargar el archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `${fileName}.xlsx`);
  }
   private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

}