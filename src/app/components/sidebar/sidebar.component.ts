import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from "../button/button.component";
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    private service = inject(JwtService);


  logout(){
    this.service.deleteToken();
  }

}
