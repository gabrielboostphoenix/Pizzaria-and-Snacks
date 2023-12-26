import { signUp } from '../dto/signup';
import { prisma } from '../../../prisma/prismaClient';

const addUser = async (data: signUp) => {
    const result = await prisma.user.create({
        data: {
            name: data.userName,
            email: data.userEmail,
            password: data.userPassword
        }
    });

    return result;
}

const checkIfEmailIsBeenUsed = async (email: string) => {
    const result = await prisma.user.findFirst({
        where: {
            email: email
        }
    });

    return result;
}

export { addUser, checkIfEmailIsBeenUsed };