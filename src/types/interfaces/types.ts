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

export interface IAddBoard {
    titulo: string;
    descricao: string;
}

export interface IBoard {
    id: string;
    titulo: string;
    descricao: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    itensBoard: Array<ItemBoard>;
}

export interface ItemBoard {
    id: string;
    titulo: string;
    descricao: string;
    categoria: string;
    createdAt: Date;
    updateAt: Date;
    finalizedA: Date;
}

export interface IAddItem {
    titulo: string;
    descricao: string;
    categoryType: string;
    idBoard: string;
}

export interface IDecodeJWT {
    email: string;
    exp: number;
    id: string;
    iss: string;
    sub: string;
}