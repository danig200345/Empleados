import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'Inicio',
    loadComponent: () => import('./pages/inicio/inicio.component').then(m => m.InicioComponent)
  },
  {
    path: 'Empleados/:id',
    loadComponent: () => import('./pages/empleados/empleados.component').then(m => m.EmpleadosComponent)
  },
  {
    path: '',
    redirectTo: 'Inicio',
    pathMatch: 'full'
  }
];
