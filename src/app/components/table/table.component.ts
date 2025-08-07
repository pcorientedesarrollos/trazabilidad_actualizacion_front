import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() columnas: { label: string, key: string , align : string}[] = [];
  @Input() data: any[] = [];
  @Input() templateAcciones?: TemplateRef<any>;
}

