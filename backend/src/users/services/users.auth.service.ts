// Importing area
import { prisma } from '../../../prisma/prismaClient';
import { signIn } from '../dto/sign.in';

// Declaration of service functionalities

// This functionality finds a specif user and return your ID
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

// Exporting area
export { findSpecifUserID };