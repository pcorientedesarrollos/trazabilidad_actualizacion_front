import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
    private router = inject(Router);


  logout(){
    this.service.deleteToken();
    this.router.navigate(['login'])
  }

}
