import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-editar-cliente',
  templateUrl: './form-editar-cliente.component.html',
  styleUrls: ['./form-editar-cliente.component.css']
})
export class FormEditarClienteComponent {

  constructor (
    private clienteService: ClientesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  clienteForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    rendaMensal: new FormControl(0, [Validators.required, this.valorMaiorQueZero]),
    rua: new FormControl('', Validators.required),
    numero: new FormControl(0, [Validators.required, this.valorMaiorQueZero]),
    cep: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)])
  })

  ngOnInit() {
    const cpf = String(this.route.snapshot.paramMap.get('cpf'))

    this.clienteService.buscarClientePorCpf(cpf).subscribe(cliente => {
      this.clienteForm.setValue({
        nome: cliente.nome!,
        cpf: cliente.cpf!,
        telefone: cliente.telefone!,
        rendaMensal: cliente.rendimentoMensal!,
        rua: cliente.endereco!.rua!,
        numero: cliente.endereco!.numero!,
        cep: cliente.endereco!.cep!
      })
      console.log(this.clienteForm)
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Cliente não encontrado',
        timer: 2000
      }).then(() => {
        this.router.navigate(['/clientes'])
      })
    })
  }

  editar() {
    const cpf = String(this.route.snapshot.paramMap.get('cpf'))
    const telefoneFormatado = this.formataTelefone(this.clienteForm.get('telefone')!.value!)
    const cpfFormatado = cpf.replace(/[.-]/g, '')
    const cepFormatado = this.formataCep(this.clienteForm.get('cep')!.value!)

    const cliente: ICliente = {
      cpf: cpfFormatado as string,
      nome: this.clienteForm.get('nome')!.value as string,
      telefone: telefoneFormatado as string,
      rendimentoMensal: this.clienteForm.get('rendaMensal')!.value as number,
      endereco: {
        rua: this.clienteForm.get('rua')!.value as string,
        numero: this.clienteForm.get('numero')!.value as number,
        cep: cepFormatado as string
      }
    }


    this.clienteService.alterarCliente(cliente, cpf).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Cliente alterado com sucesso!',
        timer: 2000
      }).then(() => {
        this.router.navigate(['/clientes'])
      })
    }, error => {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Erro ao salvar o cliente',
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
