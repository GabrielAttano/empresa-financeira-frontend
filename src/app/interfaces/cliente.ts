import { IEndereco } from "./endereco"

export interface ICliente {
  id?: number;
  cpf: string;
  nome?: string;
  telefone?: string;
  rendimentoMensal?: number;
  endereco?: IEndereco;
}
