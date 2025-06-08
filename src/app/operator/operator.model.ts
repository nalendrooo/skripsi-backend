export interface IBodyCreateOperatorModel {
    telephone: string;
    name: string;
    email: string;
    password: string;
    divisionId: number;
}

export interface IBodyLoginOperatorModel {
    email: string;
    password: string;
}