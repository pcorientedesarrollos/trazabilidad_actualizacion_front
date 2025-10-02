import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  usuario: string | null = null;

ngOnInit(): void {
  this.usuario = localStorage.getItem('usuario');
}

}
