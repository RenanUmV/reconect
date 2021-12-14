import { PostagemModel } from "./PostagemModel"

export class TemaModel{
  public id: number
  public tema: string
  public descricao: string
  public foto: string
  public postagem: PostagemModel[]
}