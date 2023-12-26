import { prisma } from '../../../prisma/prismaClient';
import { signIn } from '../dto/signin';

const findSpecifUserID = async (data: signIn) => {
    const result = await prisma.user.findMany({
        where: {
            email: data.userEmail,
            password: data.userPassword
        },
        select: {
            id: true
        }
    });

    return result;
}

export { findSpecifUserID };