import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Cek apakah sudah ada admin
  const existing = await prisma.admin.findFirst({
    where: {
      telephone: '081234567890', // bisa diganti
    },
  })

  if (!existing) {
    await prisma.admin.create({
      data: {
        telephone: '081234567890',
        name: 'Admin Utama',
        email: 'admin@dishub.go.id',
        password: '$2b$10$LFF/TCnPFfyrF5uHsgTtVe3XS9p2UAt/vIsTm3H5.BEUzNenzqida', // sudah di-hash
        isActive: true,
        adminRole: 'SUPERADMIN',
        division: {
          connectOrCreate: {
            where: { id: 1 },
            create: {
              title: 'Divisi Umum', // ganti sesuai kebutuhan
            },
          },
        },
      },
    })
    console.log('Admin berhasil ditambahkan.')
  } else {
    console.log('Admin sudah ada, tidak ditambahkan.')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
