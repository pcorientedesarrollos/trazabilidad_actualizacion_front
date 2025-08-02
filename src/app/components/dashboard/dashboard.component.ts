import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { FooterComponent } from "../footer/footer.component";


@Component({
  selector: 'app-dashboard',
  imports: [FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit{
    ngAfterViewInit(): void {
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
  }


}
