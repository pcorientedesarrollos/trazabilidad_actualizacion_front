import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApicultoresComponent } from './pages/apicultores/apicultores.component';
import { ApiariosComponent } from './pages/apiarios/apiarios.component';
import { AcopiadoresComponent } from './pages/acopiadores/acopiadores.component';
import { TransportesComponent } from './pages/transportes/transportes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CatalogosComponent } from './pages/catalogos/catalogos.component';
import { UtileriasComponent } from './pages/utilerias/utilerias.component';
import { EntradasComponent } from './pages/entradas/entradas.component';


export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
    },

    {
        path: 'home', component: HomeComponent,
        children :[
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent},
            { path: 'apicultores', component: ApicultoresComponent},
            { path: 'apiarios', component: ApiariosComponent},
            { path: 'acopiadores', component: AcopiadoresComponent},
                  { path: 'transportes', component: TransportesComponent},
                    { path: 'usuarios', component: UsuariosComponent},
                      { path: 'entradas', component: EntradasComponent},
                        { path: 'catalogos', component: CatalogosComponent},
                               { path: 'utilerias', component: UtileriasComponent},

            //rutas hijas
        ]
    },


    /* ruta comodín por si alguien ingresa una URL incorrecta */
    {
        path: '**',
        redirectTo: ''
    }


];
