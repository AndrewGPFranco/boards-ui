export interface IToast {
    id: number;
    message: string;
    type: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    nome: string;
    email: string;
    senha: string;
    username: string;
    nomeCompleto: string;
    numeroTelefone: string;
    dataNascimento: Date;
}

export interface IAddItem {
    titulo: string;
    descricao: string;
}