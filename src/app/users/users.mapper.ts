// import { User } from "@prisma/client";
// import { TemplateDTO } from "./template-dto";

// export const getUsersDTOMapper = (data: User[]): TemplateDTO[] => {
//   return data.map((item) => ({
//     id: item.id,
//     name: item.name,
//     email: item.email,
//   }));
// };

// export const getUserDTOMapper = (data: User[]): TemplateDTO[] => {
//   return data.map((item) => ({
//     id: item.id,
//     name: item.name,
//     email: item.email,
//   }));
// };

export const mapperUsers = (data: DTOUserPrisma[]) => {
  return data.map((user) => ({
    id: user.id,
    name: user.name,
    isActive: user.isActive,
    divisionTitle: user.division?.title || '',
    code: user.code,
    telephone: user.telephone,
    _count: user._count.itemOut
  }));
};