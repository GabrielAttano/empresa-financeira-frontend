import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-cadastrar-cliente',
  templateUrl: './form-cadastrar-cliente.component.html',
  styleUrls: ['./form-cadastrar-cliente.component.css']
})
export class FormCadastrarClienteComponent {

  constructor (private clienteService: ClientesService, private router: Router) {}

  clienteForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)]),
    telefone: new FormControl('', Validators.required),
    rendaMensal: new FormControl(0, [Validators.required, this.valorMaiorQueZero]),
    rua: new FormControl('', Validators.required),
    numero: new FormControl(0, [Validators.required, this.valorMaiorQueZero]),
    cep: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)])
  })

  cadastrar() {
    const telefoneFormatado = this.formataTelefone(this.clienteForm.get('telefone')!.value!)
    const cpfFormatado = this.clienteForm.get('cpf')!.value!.replace(/[.-]/g, '')
    const cepFormatado = this.formataCep(this.clienteForm.get('cep')!.value!)

    const cliente: ICliente = {
      cpf: cpfFormatado,
      nome: this.clienteForm.get('nome')!.value as string,
      telefone: telefoneFormatado as string,
      rendimentoMensal: this.clienteForm.get('rendaMensal')!.value as number,
      endereco: {
        rua: this.clienteForm.get('rua')!.value as string,
        numero: this.clienteForm.get('numero')!.value as number,
        cep: cepFormatado as string
      }
    };

    this.clienteService.cadastrarCliente(cliente).subscribe(result => {
      Swal.fire({
        icon: 'success',
        title: 'Cliente cadastrado com sucesso!',
        timer: 2000
      }).then(() => {
        this.router.navigate(['/clientes'])
      })
    }, error => {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar o cliente',
        text: error.error,
        timer: 5000
      })
    })
  }

  valorMaiorQueZero(control: FormControl): { [key: string]: any } | null {
    const valor = control.value;
  if (valor !== null && valor !== undefined && valor <= 0) {
    return { 'valorInvalido': true };
  }
  return null;
  }

  formataTelefone(telefone: string): string {
    const match = telefone.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]})${match[2]}-${match[3]}`;
    }
    return telefone;
  }

  formataCep(cep: string): string {
    const match = cep.match(/^(\d{5})(\d{3})$/);
    if (match) {
      return `${match[1]}-${match[2]}`;
    }
    return cep;
  }
}