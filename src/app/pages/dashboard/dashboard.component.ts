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
/*   ngAfterViewInit(): void {
    // Pie chart
    new Chart("pieChart", {
      type: 'pie',
      data: {
        labels: ["Work", "Eat", "Commute", "Watch TV", "Sleep"],
        datasets: [{
          data: [12, 8, 8, 8, 64],
          backgroundColor: ["#1D4ED8", "#3B82F6", "#10B981", "#F59E0B", "#F97316"]
        }]
      }
    }); 

    // Bar chart
     new Chart("barChart", {
      type: 'bar',
      data: {
        labels: ["Copper", "Silver", "Gold", "Platinum"],
        datasets: [{
          label: "Electron Density",
          backgroundColor: "#EF4444",
          data: [8.9, 10.5, 19.3, 21.4]
        }]
      }
    }); 
  } */

   obtenerDashBoard(){
    this.dashBoardService.getDashBoard().subscribe({
    })
    next:(data: DashBoard[]) =>{
      console.log(data)
    }
    
   }

}
