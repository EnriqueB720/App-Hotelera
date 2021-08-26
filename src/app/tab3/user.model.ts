import { reservaciones } from "../tab2/reservaciones.model";

export class Usuario{
  constructor(
    public id: string,
    public nombreCompleto: string,
    public numeroTel: string,
    public email: string,
    public contrasena: string,
    public rol: string,
    public img: string,
    public reservaciones: reservaciones[]
  ){}
}

