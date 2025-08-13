// login.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './service/login.service';
import { Login } from '../../interface/auth/auth.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private service = inject(LoginService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public loginForm = this.formBuild.group({
    Usuario: ['', Validators.required],
    Contraseña: ['', Validators.required]
  });

  login() {

    const data: Login = {
      Usuario: this.loginForm.value.Usuario ?? '',
      Contraseña: this.loginForm.value.Contraseña ?? ''
    };

    this.service.login(data).subscribe({
      next: (response) => {
/*         localStorage.setItem('token', response.data.Token);
        console.log('Inicio de sesión exitoso:', response);
              console.log('Este es mi token:', response.data.Token); */
        this.router.navigate(['home']);
      },
      error: (error) => {
        // Manejo de errores
        console.error('Error al iniciar sesión:', error);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
