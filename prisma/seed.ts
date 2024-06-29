import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const password = await bcrypt.hash('12345678', 10)

    const user = await prisma.user.upsert({
        where: {
            email: 'opick.yayat@gmail.com'
        },
        create: {
            email: 'opick.yayat@gmail.com',
            name: 'Taufiq Hidayat',
            username: 'opickyayat',
            password,
            role: "SUPERADMIN"
        },
        update: {
            email: 'opick.yayat@gmail.com',
            name: 'Taufiq Hidayat',
            username: 'opickyayat',
            password,
            role: "SUPERADMIN"
        }
    })
    
    console.log(user);
    
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });