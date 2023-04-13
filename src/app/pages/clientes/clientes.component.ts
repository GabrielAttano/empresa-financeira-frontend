import { Component } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent {
  clientes: ICliente[] = []
  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
    this.clientesService.buscarTodosClientes().subscribe(result => {
      this.clientes = result;
    })
  }
}
