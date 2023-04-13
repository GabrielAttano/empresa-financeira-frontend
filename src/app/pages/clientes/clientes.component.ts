import { Component } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent {
  clientes: ICliente[] = []
  constructor(private clientesService: ClientesService, private router: Router) {}

  ngOnInit() {
    this.clientesService.buscarTodosClientes().subscribe(result => {
      this.clientes = result;
    }, error => {
      if (error.status === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao conectar.',
          text: 'Não foi possível se conectar com a API.'
        }).then(() => {
          this.router.navigate(['/'])
        })
      }
    })
  }
}
