import { Component, Input } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabela-clientes',
  templateUrl: './tabela-clientes.component.html',
  styleUrls: ['./tabela-clientes.component.css']
})
export class TabelaClientesComponent {
  @Input() clientes: ICliente[] = [];

  constructor(private clienteService: ClientesService) {}

  onRemoverCliente(cpf: string) {
    this.clienteService.deletarClientePorCpf(cpf).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Cliente removido com sucesso!',
        timer: 2000
      }).then(() => {
        window.location.reload();
      })
    },
    error => console.error(error))
  }
}
