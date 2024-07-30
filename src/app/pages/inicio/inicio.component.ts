import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../Models/Empleado';



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatPaginator, MatPaginatorModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  private EmpleadosServico = inject(EmpleadoService)
  public listaEmpleados: Empleado[] = []
  public displayedColumns: string[] = ['nombreCompleto', 'correo', 'sueldo', 'fechaDeContrato', 'acciones']





  obtenerEmpleados() {
    this.EmpleadosServico.lista().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaEmpleados = data
        }

      },
      error: (error) => { console.log(error.message) }
    })
  }
  constructor(private router: Router) {
    this.obtenerEmpleados()
  }


  nuevo() {
    this.router.navigate(['/Empleados', 0])
  }
  editar(objeto: Empleado) {
    this.router.navigate(['/Empleados', objeto.idEmpleado])
  }
  eliminar(objeto: Empleado) {
    if (confirm("Deseas eliminar el empleado " + objeto.nombreCompleto))
      this.EmpleadosServico.eliminar(objeto.idEmpleado).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.obtenerEmpleados()
          } else {
            alert("No se pudo eliminar")
          }

        },
        error: (error) => { console.log(error.message) }

      })
  }
}
