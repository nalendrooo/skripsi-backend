// export interface TemplateDTO {
//     id?: string;
//     name?: string;
//     email: string;
//   }

//   export interface TemplateBodyRequest {
//     name: string;
//     email: string;
//     password: string;
//   }
interface DTOUserPrisma {
    id: number;
    name: string;
    division: {
        title: string;
    };
    divisionId: number;
    isActive: boolean;
    code: string | null
    telephone: string;
    _count: {
        itemOut: number;
    }
}