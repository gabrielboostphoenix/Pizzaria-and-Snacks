// Importing area
import { signUp } from '../dto/sign.up';
import { prisma } from '../../../prisma/prismaClient';

// Declaration of service functionalities

// This functionality adds an user
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

// This functionality checks for an used e-mail
const checkIfEmailIsBeenUsed = async (email: string) => {
    const result = await prisma.user.findFirst({
        where: {
            email: email
        }
    });

    return result;
}

// Exporting area
export { addUser, checkIfEmailIsBeenUsed };