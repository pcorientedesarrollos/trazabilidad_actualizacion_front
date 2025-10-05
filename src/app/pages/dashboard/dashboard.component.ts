import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { FooterComponent } from "../../components/footer/footer.component";
import { dashBoardService } from './service/dashboard.service';
import { DashBoard } from './interface/dashboard.interface';


@Component({
  selector: 'app-dashboard',
  imports: [FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent /* implements AfterViewInit */ {

    constructor(private dashBoardService: dashBoardService) { }
      dashboardData : any[] = [];
      
    ngOnInit(): void {
    this.obtenerDashBoard();  
  }
   obtenerDashBoard(){
    this.dashBoardService.getDashBoard().subscribe({
      next:(data: DashBoard[]) =>{
      this.dashboardData = data;
      console.log('Este es mi data',data)
    },
    error: (err) => {
    console.error('Error al obtener datos del dashboard:', err);
  }
    })
    
    
   }

}
