import { PostagemModel } from "./PostagemModel"

export class UsuarioModel{
  public id: number
  public nome: string
  public usuario: string
  public foto: string
  public senha: string
  public tipo: string
  public dataNascimento: Date
  public postagem: PostagemModel[]
}
