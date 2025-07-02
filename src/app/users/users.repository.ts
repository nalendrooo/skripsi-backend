// import { Users } from "../../../generated/client"
// import { prisma } from "../../setup/prisma"

import { IQueryParams } from "../../interface"
import { prisma } from "../../setup/prisma"
import { IBodyCreateUserModel } from "./users.model"

export const getUserById = async ({
    userId: id
}: {
    userId: number
}) => {
    return await prisma.users.findFirst({
        where: {
            id
        }
    })
}

// export const insertUser = async ({
//     data
// }: {
//     data: Users
// }) => {
//     return await prisma.users.create({
//         data
//     })
// }

// import { PrismaClient } from "@prisma/client"
// import { IArgUser, IBodyUser } from "./users.model"

// const db = new PrismaClient()

// export const createUser = async (data: IBodyUser, hashedPassword: string) => {
//     return await db.user.create({
//         data: {
//             password: hashedPassword,
//             username: data.username,
//             nama: data?.nama,
//             telephone: data?.telephone,
//         },
//     })
// }

// export const getUserByUsername = async (username: string) => {
//     return await db.user.findUnique({
//         where: {
//             username
//         },
//         include: {
//             userRole: {
//                 select: {
//                     role: {
//                         select: {
//                             nama: true
//                         }
//                     }
//                 }
//             }
//         }
//     })
// }

// export const getUserById = async (id: number) => {
//     return await db.user.findUnique({
//         where: {
//             id
//         },

//         select: {
//             username: true,
//             email: true,
//             telephone: true,
//             orders: {
//                 include: {
//                     userAdmin: {
//                         select: {
//                             email: true,
//                             username: true,
//                             nama: true,
//                             telephone: true,
//                             userRole: {
//                                 select: {
//                                     roleId: true
//                                 }
//                             }
//                         }
//                     },
//                     jenisIklan: true,
//                     bidang: true,
//                     waktuPostOrders: {
//                         include: {
//                             postOrderLink: true
//                         }
//                     },
//                     contentOrders: true,
//                     pembayaranOrder: {
//                         include: {
//                             metodePembayaran: true
//                         }
//                     },
//                     paket: true,
//                     tambahanPaketOrders: {
//                         include: {
//                             tambahanPaket: true
//                         }
//                     }
//                 }
//             },

//             createdAt: true,
//             userRole: {
//                 select: {
//                     role: {
//                         select: {
//                             nama: true
//                         }
//                     }
//                 }
//             }
//         },
//     })
// }

// export const updateAccessToken = async (data: IArgUser) => {
//     return await db.userAccessToken.create({
//         data
//     })
// }


// export const getAccessToken = async (userId: number) => {
//     return await db.userAccessToken.findFirst({
//         where: {
//             userId
//         }
//     })
// }
// export const deleteAccessToken = async (userId: number) => {
//     return await db.userAccessToken.delete({
//         where: {
//             userId
//         }
//     })
// }
// export const createUserRole = async (userId: number, roleId: number) => {
//     return await db.userRole.create({
//         data: {
//             userId,
//             roleId
//         }
//     })
// }
// export const getRole = async () => {
//     return await db.role.count()
// }

// export const checkUsernameExist = async (username: string) => {
//     return await db.user.count({
//         where: {
//             username
//         }
//     })
// }

// export const getUserByRole = async (role: number) => {
//     return await db.user.findMany({
//         where: {
//             userRole: {
//                 some: {
//                     roleId: role
//                 }
//             }
//         },
//         select: {
//             id: true,
//             username: true,
//             nama: true,
//             email: true,
//             telephone: true,
//             createdAt: true
//         }
//     })
// }

// export const updatePassword = async (id: number, password: string) => {
//     return await db.user.update({
//         where: {
//             id
//         },
//         data: {
//             password
//         }
//     })
// }

export const createUser = async ({
    data
}: {
    data: IBodyCreateUserModel
}) => {
    return await prisma.users.create({
        data
    })
}
export const updateUser = async ({
    data,
    userId: id
}: {
    data: IBodyCreateUserModel
    userId: number
}) => {
    return await prisma.users.update({
        where: {
            id
        },
        data: {
            ...data,
            updatedAt: new Date()
        }
    })
}

export const getUserByTelephone = async ({
    telephone
}: {
    telephone: string
}) => await prisma.users.findFirst({
    where: {
        telephone
    }
})

export const getAllUser = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        page = 1,
        perPage = 10,
        search = '',
    } = query

    return await prisma.users.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: search,
                    }
                },
                {
                    telephone: {
                        contains: search,
                    }
                }
            ],
            NOT: {
                divisionId: 1
            }
        },
        select: {
            id: true,
            name: true,
            divisionId: true,
            division: {
                select: {
                    title: true
                }
            },
            isActive: true,
            code: true,
            telephone: true,
            _count: {
                select: {
                    itemOut: true
                }
            }
        },
        skip: (Number(page) - 1) * Number(perPage),
        take: Number(perPage),
    })
}

export const getCountAllUser = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        search = ''
    } = query

    return await prisma.users.count({
        where: {
            OR: [
                {
                    name: {
                        contains: search,
                    }
                },
                {
                    telephone: {
                        contains: search,
                    }
                }
            ]
        },
    })
}

