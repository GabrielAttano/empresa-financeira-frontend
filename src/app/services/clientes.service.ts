import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { ICliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  endpoint = 'api/v1/empresa-financeira/clientes'
  api = environment.api

  constructor(private http: HttpClient) { }

  // métodos para requests
  buscarTodosClientes() {
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}`)
  }

  cadastrarCliente(cliente: ICliente) {
    return this.http.post<ICliente>(`${this.api}/${this.endpoint}`, cliente)
  }

  alterarCliente(cliente: ICliente, cpf: string) {
    return this.http.put<ICliente>(`${this.api}/${this.endpoint}/${cpf}`, cliente)
  }

  buscarClientePorCpf(cpf: string) {
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${cpf}`)
  }

  deletarClientePorCpf(cpf: string) {
    return this.http.delete<ICliente>(`${this.api}/${this.endpoint}/${cpf}`)
  }
}
