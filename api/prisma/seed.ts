import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const restaurant = await prisma.restaurant.upsert({
    where: {
      name: 'ร้านพี่ช้าง',
    },
    create: {
      location: 'โรงอาหารคณะไอที',
      isOpen: true,
      User: {
        create: {
          email: '63070169@kmitl.ac.th',
          role: 'Restaurant',
          name: 'ร้าน',
          surname: 'พี่ช้าง',
        }
      },
      Menu: {
        createMany: {
          data: [
            {
              name: 'ข้าวกระเพราไข่ดาวพิเศษ',
              amount: 100,
              price: 45,
              category: 'Food'
            },
            {
              name: 'ข้าวไข่เจียว',
              amount: 100,
              price: 30,
              category: 'Food'
            },
            {
              name: 'ข้าวไข่ดาว',
              amount: 100,
              price: 30,
              category: 'Food'
            }
          ]
        }
      },
      name: 'ร้านพี่ช้าง',
      cashFlow: 0
    },
    update: {}
  })

  await prisma.user.upsert({
    where: {
      email: 'suphachai.fang@gmail.com'
    },
    create: {
      email: 'suphachai.fang@gmail.com',
      name: 'Suphachai',
      surname: 'Chuensooksri'
    },
    update: {}
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })