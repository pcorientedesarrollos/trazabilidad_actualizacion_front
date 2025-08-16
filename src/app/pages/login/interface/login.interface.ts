export interface ResponseAuth{
    error : boolean;
    status: number;
    message: string;
    data : data;

    
}

export interface data   {
   IdUsuarioTra: number;
  Usuario: string;
  Token: string;
}

export interface Login {
  Usuario: string;
  Contraseña: string;
}

